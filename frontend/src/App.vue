<template>
    <v-app>
        <!-- ヘッダー -->
        <v-app-bar ref="a" elevation="0" density="comfortable" color="#e4e2dd">
            <!-- メニュー表示切り替えボタン -->
            <v-app-bar-nav-icon
                @click="drawer = !drawer"
                v-if="!mdAndUp"
            ></v-app-bar-nav-icon>
            <img
                :src="require('@/assets/Jozady.png')"
                alt="Jozady"
                class="logo"
                v-if="!(!mdAndUp && route.name == 'schedule')"
            />
            <!-- デバック用の枠線表示ボタン -->
            <v-btn @click="toggleBorder" variant="outlined">枠線表示</v-btn>

            <!-- スケジュールのタイトル -->
            <h3 class="scheduleTitle">{{ getTitle }}</h3>
        </v-app-bar>

        <!-- ナビゲーションドロワー -->
        <component :is="currentDrawer" v-model="drawer" />

        <!-- メインコンテンツ -->
        <v-main class="main">
            <router-view />
        </v-main>
    </v-app>
</template>

<script setup>
// Vue関連のインポート
import { onMounted, ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";
import { useItineraryStore } from "./stores/itineraryStore";

// コンポーネントのインポート
import ScheduleNavigationDrawer from "./components/ScheduleNavigationDrawer.vue";
import HomeNavigationDrawer from "./components/HomeNavigationDrawer.vue";

// データの初期化
const route = useRoute();
const { mdAndUp } = useDisplay();
const drawer = ref(false);
const borderEnabled = ref(false);

const getTitle = computed(() => {
    const id = route.params.itineraryId;
    const title = id ? useItineraryStore().getTitle(id) : null;
    return title;
});

// 現在のルートに応じて表示するドロワーを切り替える
const currentDrawer = computed(() => {
    if (route.name === "home") {
        return HomeNavigationDrawer;
    } else if (route.name === "schedule") {
        return ScheduleNavigationDrawer;
    }
    return null;
});

// 枠線表示の切り替え（デバッグ用）
const toggleBorder = () => {
    borderEnabled.value = !borderEnabled.value;
    document.querySelectorAll("*").forEach((el) => {
        if (borderEnabled.value) {
            el.style.border = "1px solid #ccc";
        } else {
            el.style.border = "";
        }
    });
};

// ドロワーの初期状態を設定
onMounted(() => {
    if (mdAndUp.value) drawer.value = true;
    else drawer.value = false;
});
watch(route, () => {
    if (mdAndUp.value) drawer.value = true;
    else drawer.value = false;
});
</script>

<style>
* {
    margin: 0;
    padding: 0;
    /* border: 1px solid #ccc; */
}

#app {
    font-family: Vanir, Helvetica, Arial, sans-serif;
    color: #2b3742;
    height: 100vh;
}

.header {
    height: 60px;
    /* background-color: #fff2b9; */
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    padding: 10px;
    font-size: 10px;
    gap: 10px;
    position: relative;
}

.logo {
    padding-left: 10px;
    height: 100%;
    overflow: hidden;
}

.scheduleTitle {
    color: #36506a;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap; /* テキストの折り返しを禁止 */
}

.logged-in {
    display: flex;
    height: 100%;
}

.main {
    background-color: #f4f4f9;
    height: 100%;
    width: 100%;
}
</style>
