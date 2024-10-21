<template>
    <div id="map"></div>
</template>

<script setup>

import { computed, onMounted } from 'vue';
import { usePlaceStore } from '@/stores/placeStore';
import { useMarkerStore } from '@/stores/markerStore';
/* global google */

const { handlePlace } = usePlaceStore();
const places = computed(() => usePlaceStore().places);
const { addMarker } = useMarkerStore();
const apiKey = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;
let AdvancedMarkerElement;
let map;
let firstPosition = [41.7910, 140.7677]; // 最初に表示するマップの中心

// マップを読み込むメソッド
const loadMap = async () => {
    if (typeof google === 'undefined') {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
        await new Promise((resolve) => (script.onload = resolve));
    }
    AdvancedMarkerElement = (await google.maps.importLibrary("marker")).AdvancedMarkerElement;
    // initAdvancedMarkerElement(AdvancedMarkerElement);
};

// マップを初期化するメソッド
const initMap = async () => {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: firstPosition[0], lng: firstPosition[1] },
        zoom: 12,
        mapId: '688bfeaf04260b89',
    });
    places.value.forEach((place) => { addMarker(place, map, AdvancedMarkerElement); });

    map.addListener('click', async (event) => {
        if (event.placeId) {
            await handlePlace(event.placeId);
            addMarker(places.value[places.value.length - 1], map, AdvancedMarkerElement);
        }
    });

};

onMounted(async () => {
    await loadMap();
    initMap();
});

</script>



<style scoped>
#map {
    width: 100%;
    height: 100%;
}
</style>