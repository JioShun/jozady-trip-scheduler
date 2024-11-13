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

// コンポーネントのインポート
import GoogleMap from "@/components/GoogleMap.vue";
import SideBar from "@/components/SideBar.vue";

// ルートパラメータの取得
const route = useRoute();

// eslint-disable-next-line
const id = route.params.id;

onMounted(() => {});
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
