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
        async removePlace(place_index) {
            try {
                const response = await fetch(`/api/places/${place_index}`, { method: 'DELETE' });
                if (response.ok) {
                    useMarkerStore().removeMarker(place_index);
                    this.places = this.places.filter(p => p.place_index !== place_index);
                }
            } catch (error) {
                console.error('Error removing place:', error);
            }
        },

        // 場所を処理する関数
        async handlePlace(placeId) {
            try {
                const response = await fetch('/api/places/handlePlace', { // 
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ placeId }),
                });
                const newPlace = await response.json();
                console.log(newPlace);
                this.places.push(newPlace);
                return newPlace;
            } catch (error) {
                console.error('Error handling place:', error);
            }
        },
    },
});