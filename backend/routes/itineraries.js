
import express from 'express';
const router = express.Router();
import con from '../db.js';

// 全データの取得
router.get('/', (req, res) => {
    const query = 'SELECT * FROM itineraries';
    con.query(query, (err, result) => {
        if (err) {
            console.error('Error getting itineraries:', err);
            res.status(500).send('Failed to get itineraries');
            return;
        }

        const renameResult = result.map(itinerary => {
            return {
                itineraryId: itinerary.id,
                title: itinerary.title,
                startDate: itinerary.start_date,
                endDate: itinerary.end_date,
                people: itinerary.people,
                relationship: itinerary.relationship,
                userEmail: itinerary.user_email
            };
        });

        res.json(renameResult);
    });
});

// ユーザに合ったしおりの取得
router.get('/byUser', (req, res) => {
    const userEmail = req.query.userEmail;
    const query = 'SELECT * FROM itineraries WHERE user_email = ?';
    con.query(query, [userEmail], (err, result) => {
        if (err) {
            console.error('Error getting itineraries:', err);
            res.status(500).send('Failed to get itineraries');
            return;
        }

        const renameResult = result.map(itinerary => {
            return {
                itineraryId: itinerary.id,
                title: itinerary.title,
                startDate: itinerary.start_date,
                endDate: itinerary.end_date,
                people: itinerary.people,
                relationship: itinerary.relationship,
                userEmail: itinerary.user_email
            };
        });

        res.json(renameResult);
    });
});

// しおりの追加
router.post('/', (req, res) => {
    const { title, startDate, endDate, people, relationship } = req.body;
    const query = 'INSERT INTO itineraries (title, start_date, end_date, people, relationship) VALUES (?, ?, ?, ?, ?)';
    con.query(query, [title, startDate, endDate, people, relationship], (err, result) => {
        if (err) {
            console.error('Error adding itinerary:', err);
            res.status(500).send('Failed to add itinerary');
            return;
        }
        res.status(200).json({ message: 'Itinerary added successfully', itinerary_id: result.insertId });
    });
});

// しおりの削除
router.delete('/:id', (req, res) => {
    const query = 'DELETE FROM itineraries WHERE id = ?';
    con.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error deleting itinerary:', err);
            res.status(500).send('Failed to delete itinerary');
            return;
        }
        res.status(200).json({ message: 'Itinerary deleted successfully' });
    });
});


export default router;