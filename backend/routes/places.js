const express = require('express');
const router = express.Router();
const con = require('../db');
const axios = require('axios');
const MAP_API_KEY = process.env.GOOGLE_MAP_API;

// Google APIからプレース情報を取得する関数
const getPlaceInfo = async (placeId) => {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
        params: {
            place_id: placeId,
            fields: 'name,formatted_address,geometry,place_id,types,photos',
            key: MAP_API_KEY,
            language: 'ja',
        },
    });
    return response.data.result;
};

// プレース情報をデータベースに保存する関数
const postPlace = async (placeInfo) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Place (name, formatted_address, location, place_id, memo, types) VALUES (?, ?, ?, ?, ?, ?)';
        con.query(query, placeInfo, (err, result) => {
            if (err) {
                console.error('Error inserting into Place:', err);
                return reject('Failed to save place data');
            }
            resolve(result.insertId);
        });
    });
};

const getPlacePhotoUrl = async (placeInfo) => {
    const { photos } = placeInfo;
    const photoUrl = (photos && photos.length > 0 && photos[0].photo_reference)
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[0].photo_reference}&key=${MAP_API_KEY}`
        : null; // photoUrlを取得
    return photoUrl;
}

// GETリクエスト 
// データベースからデータを取得してJSON形式で返す
router.get('/', async (req, res) => {
    try {
        // Placeテーブルから全データを取得
        con.query('SELECT * FROM Place', async (err, result, fields) => {
            if (err) throw err;

            // すべてのplaceに対してphotoUrlを取得し、Promise.allで並列処理
            await Promise.all(result.map(async (place) => {
                const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
                    params: {
                        place_id: place.place_id,
                        fields: 'photos',
                        key: MAP_API_KEY,
                    },
                });
                place.photoUrl = await getPlacePhotoUrl(response.data.result);
            }));

            // すべてのphotoUrlが追加された後で結果を返す
            res.json(result);
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});


// POSTリクエスト
// リクエストボディのデータをデータベースに保存
// router.post('/', async (req, res) => {
//     try {
//         const placeId = await postPlace(req.body);
//         res.status(200).json({ message: 'Data saved successfully', place_id: placeId });
//     } catch (error) {
//         res.status(500).json({ message: error });
//     }
// });

// DELETEリクエスト
router.delete('/:id', (req, res) => {
    const placeIndex = req.params.id;
    const query = 'DELETE FROM Place WHERE place_index = ?';
    con.query(query, [placeIndex], (err, result) => {
        if (err) {
            console.error('Error deleting from Place:', err);
            return res.status(500).json({ message: 'Failed to delete place data' });
        }
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Data not found' });
        res.status(200).json({ message: 'Data deleted successfully' });
    });
});

// プレース情報を取得するハンドラ
router.post('/getPlaceInfo', async (req, res) => {
    const { place_id } = req.body;
    try {
        const placeInfo = await getPlaceInfo(place_id);
        res.json(placeInfo);
    } catch (error) {
        console.error('Error fetching place info:', error);
        res.status(500).json({ message: 'Failed to fetch place data' });
    }
});

// getPlaceInfoとpostPlacesを組み合わせる
router.post('/handlePlace', async (req, res) => {
    const { placeId } = req.body;
    try {
        const placeInfo = await getPlaceInfo(placeId); // placeIdからplace情報を取得

        // 保存するplace情報を整形
        const { name, formatted_address, geometry, place_id, memo, types } = placeInfo;
        const location = JSON.stringify(geometry.location); // locationをJSON形式に変換
        const newTypes = JSON.stringify(types); // typesをJSON形式に変換
        const newPlaceInfo = [name, formatted_address, location, place_id, memo, newTypes]; // place情報を作成
        await postPlace(newPlaceInfo); // データベースに新しいplaceを保存
        con.query('SELECT * FROM Place ORDER BY place_index DESC LIMIT 1', async (err, result) => { // 最新のplaceを取得
            if (err) throw err;
            result[0].photoUrl = await getPlacePhotoUrl(placeInfo); // photoUrlを追加
            res.json(result[0]); // 最新のplaceを返す
        });

    } catch (error) {
        console.error('Error handling place:', error);
        res.status(500).send('Error handling place');
    }
});

module.exports = router;