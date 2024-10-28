<template>
    <v-text-field
        v-model="searchText"
        variant="solo"
        id="autocomplete"
        prepend-inner-icon="search"
        dense
    ></v-text-field>
    <div id="map"></div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { usePlaceStore } from "@/stores/placeStore";
import { useMarkerStore } from "@/stores/markerStore";
/* global google */

const { handlePlace } = usePlaceStore();
const places = computed(() => usePlaceStore().places);
const { addMarker } = useMarkerStore();

let autocomplete;
let firstPosition = [41.791, 140.7677]; // 最初に表示するマップの中心

// マップを初期化するメソッド
const initMap = async (map) => {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: firstPosition[0], lng: firstPosition[1] },
        zoom: 12,
        mapId: "688bfeaf04260b89",
    });

    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // マーカーを追加
    places.value.forEach((place) => {
        addMarker(place, map, AdvancedMarkerElement);
    });

    // 検索ボックスを作成
    const input = document.getElementById("autocomplete"); // 修正点
    autocomplete = new google.maps.places.Autocomplete(input);

    // 選択された場所に基づいて地図の中心を更新
    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
        }

        // マップの中心を更新
        map.setCenter(place.geometry.location);
        map.setZoom(15);

        // マーカーを設置
        new google.maps.Marker({
            position: place.geometry.location,
            map: map,
        });
    });

    map.addListener("click", async (event) => {
        if (event.placeId) {
            await handlePlace(event.placeId);
            addMarker(
                places.value[places.value.length - 1],
                map,
                AdvancedMarkerElement
            );
        }
    });
};

onMounted(async () => {
    initMap();
});
</script>

<style scoped>
#map {
    width: 100%;
    height: 100vh;
}

.v-text-field {
    position: absolute;
    z-index: 1;
    width: 400px;
    left: 350px;
    top: 10px;
    opacity: 0.9;
}
</style>
