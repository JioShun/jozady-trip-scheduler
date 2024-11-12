import { defineStore } from 'pinia';

export const useItineraryStore = defineStore('itinerary', {
    state: () => ({
        itineraries: []
    }),
    actions: {
        // バックエンドからデータを取得するメソッド
        async fetchItineraries() {
            try {
                const response = await fetch('/api/itineraries');
                if (response.ok) this.itineraries = await response.json();
                else console.error('Error fetching itineraries:', response);
            } catch (error) {
                console.error('Error fetching itineraries:', error);
            }
        },

        // しおりを追加するメソッド
        async addItinerary(itinerary) {
            try {
                const response = await fetch('/api/itineraries', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(itinerary)
                });
                if (response.ok) {
                    const result = await response.json();
                    this.itineraries.push({ itineraryId: result.itinerary_id, ...itinerary });
                } else console.error('Error adding itinerary:', response);
            } catch (error) {
                console.error('Error adding itinerary:', error);
            }
        },

        // しおりを削除するメソッド
        async removeItinerary(itineraryId) {
            try {
                const response = await fetch(`/api/itineraries/${itineraryId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    this.itineraries = this.itineraries.filter(itinerary => itinerary.itineraryId !== itineraryId);
                } else console.error('Error deleting itinerary:', response);
            } catch (error) {
                console.error('Error deleting itinerary:', error);
            }
        }
    }
});