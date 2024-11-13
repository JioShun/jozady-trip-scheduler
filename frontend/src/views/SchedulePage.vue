<template>
    <div class="container">
        <!-- マップ -->
        <div class="map">
            <GoogleMap />
        </div>

        <!-- サイドバー（行程表） -->
        <div class="side">
            <SideBar />
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { usePlaceStore } from "@/stores/placeStore";

// コンポーネントのインポート
import GoogleMap from "@/components/GoogleMap.vue";
import SideBar from "@/components/SideBar.vue";

// ストアのインポート
const placeStore = usePlaceStore();

// ルートパラメータからIDの取得
const route = useRoute();
const id = route.params.itineraryId;

onMounted(() => {
    // 行程表の取得
    placeStore.fetchPlaces(id);
});
</script>

<style scoped>
.container {
    display: flex;
}

.map {
    width: 70%;
    height: calc(100vh - 56px);
}

.side {
    width: 30%;
    height: calc(100vh - 56px);
}
</style>
