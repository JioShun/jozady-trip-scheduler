// stores/markerStore.js
import { defineStore } from 'pinia';

export const useMarkerStore = defineStore('marker', {
    state: () => ({
        markers: [],
        infoWindows: [],
    }),
    actions: {

        // マーカーを追加するアクション
        addMarker(place, map, AdvancedMarkerElement) {
            const marker = new AdvancedMarkerElement({
                map,
                position: { lat: place.location.lat, lng: place.location.lng },
                title: place.place_index.toString(),
            });
            this.markers.push(marker);

            // eslint-disable-next-line no-undef
            const infoWindow = new google.maps.InfoWindow({
                content: `<div><strong>${place.name}</strong><br>${place.formatted_address}</div>`,
            });
            this.infoWindows.push(infoWindow);

            marker.addListener('click', () => {
                this.closeAllInfoWindows(); // 他の情報ウィンドウを閉じる
                infoWindow.open(map, marker); // 対応する情報ウィンドウを開く
            });
        },

        closeAllInfoWindows() {
            this.infoWindows.forEach(infoWindow => infoWindow.close());
        },

        // placeItemがクリックされたら対応したマーカーの情報ウィンドウを開く
        openInfoWindow(place_index) {
            const markerIndex = this.markers.findIndex(marker => marker.title === place_index.toString());
            if (markerIndex !== -1) {
                this.closeAllInfoWindows(); // すべての情報ウィンドウを閉じる
                this.infoWindows[markerIndex].open(this.markers[markerIndex].map, this.markers[markerIndex]);
            }
        },

        // マーカーを削除するアクション
        removeMarker(place_index) {
            const index = this.markers.findIndex(marker => marker.title === place_index.toString());
            if (index !== -1) {
                this.markers[index].setMap(null);
                this.markers.splice(index, 1);
                this.infoWindows.splice(index, 1);
            }
        }
    },
});
