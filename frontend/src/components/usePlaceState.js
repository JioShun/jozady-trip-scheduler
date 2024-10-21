// import { ref } from 'vue';


// const places = ref([]);

// // バックエンドからデータを取得
// const fetchPlaces = async () => {
//     console.log('fetchPlaces');
//     //isUpdated.value = false;
//     const response = await fetch('/api/places');
//     places.value = await response.json();
// };

// // データをバックエンドに送信
// const postPlaces = async (place) => {
//     console.log('postPlaces');
//     try {
//         const response = await fetch('/api/places', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(place),
//         });
//         if (response.ok) await fetchPlaces();
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// };

// // 指定した場所を削除する関数
// const removePlace = async (placeId) => {
//     try {
//         // eslint-disable-next-line
//         const response = await fetch(`/api/places/${placeId}`, {
//             method: 'DELETE',
//         });
//         if (response.ok) {
//             //await removeMarker(placeId);
//             await fetchPlaces();
//         }
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// };

// const handlePlace = async (placeId, addMarker) => {
//     console.log('handlePlace');
//     try {
//         const response = await fetch('api/places/handlePlace', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ placeId }),
//         })
//         const newPlace = await response.json();
//         fetchPlaces();
//         addMarker(newPlace);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };


// //eslint-disable-next-line
// const removeMarker = async (place_id) => {

//     const place = places.value.find(p => p.place_id === place_id);
//     if (place && place.marker) {
//         await place.marker.setMap(null); // マーカーをマップから削除
//         place.marker = null; // marker プロパティを null にして削除済みを表す
//     }
// };

// await fetchPlaces();

// // placesのカスタムフックを作成
// export function usePlaceState() {
//     return {
//         places,
//         //isUpdated,
//         fetchPlaces,
//         postPlaces,
//         removePlace,
//         handlePlace,
//     };
// }

