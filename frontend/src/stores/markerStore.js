// stores/markerStore.js
import { defineStore } from 'pinia';

export const useMarkerStore = defineStore('marker', {
    state: () => ({
        markers: [],
    }),
    actions: {

        // マーカーを追加するアクション
        addMarker(place, map, AdvancedMarkerElement) {
            this.markers.push(new AdvancedMarkerElement({
                map,
                position: { lat: place.location.lat, lng: place.location.lng },
                title: place.place_index.toString(),
            }));
        },

        // マーカーを削除するアクション
        removeMarker(place_index) {
            const index = this.markers.findIndex(marker => marker.title === place_index.toString());
            if (index !== -1) {
                this.markers[index].setMap(null);
                this.markers.splice(index, 1);
            }
        }
    },
});
