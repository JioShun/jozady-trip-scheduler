// stores/placeStore.js
import { defineStore } from 'pinia';
import { useMarkerStore } from './markerStore';

export const usePlaceStore = defineStore('place', {
    state: () => ({
        places: [],
    }),
    actions: {
        // バックエンドからデータを取得
        async fetchPlaces() {
            try {
                const response = await fetch('/api/places');
                if (response.ok) this.places = await response.json();
                else console.error('Error fetching places:', response);
            } catch (error) {
                console.error('Error fetching places:', error);
            }
        },

        // データをバックエンドに送信
        async postPlaces(place) {
            try {
                const response = await fetch('/api/places', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(place),
                });
                if (response.ok) {
                    const newPlace = await response.json();
                    this.places.push(newPlace);
                }
            } catch (error) {
                console.error('Error posting place:', error);
            }
        },

        // 指定した場所を削除する関数
        async removePlace(id) {
            try {
                const response = await fetch(`/api/places/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    useMarkerStore().removeMarker(id);
                    this.places = this.places.filter(p => p.id !== id);
                }
            } catch (error) {
                console.error('Error removing place:', error);
            }
        },

        // place_idを指定して場所情報を取得・保存する関数
        async handlePlace(placeId) {
            try {
                const response = await fetch('/api/places/handlePlace', { // 
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ placeId }),
                });
                const newPlace = await response.json();
                // console.log(newPlace);
                this.places.push(newPlace);
                return newPlace;
            } catch (error) {
                console.error('Error handling place:', error);
            }
        },

        // placeDataを受け取ってplace情報を保存する関数
        async savePlace(placeData) {
            try {
                const response = await fetch('/api/places/addPlace', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(placeData),
                });
                if (response.ok) {
                    const newPlace = await response.json();
                    // console.log(newPlace);
                    this.places.push(newPlace);
                }
            } catch (error) {
                console.error('Error saving place:', error);
            }
        },


    },
});