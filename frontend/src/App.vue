<template>
    <v-app>
        <!-- ヘッダー -->
        <v-app-bar ref="a" elevation="0" density="comfortable" color="#e4e2dd">
            <v-app-bar-nav-icon
                @click="drawer = !drawer"
                v-if="!mdAndUp"
            ></v-app-bar-nav-icon>
            <img
                :src="require('@/assets/Jozady.png')"
                alt="Jozady"
                class="logo"
            />
        </v-app-bar>

        <!-- ナビゲーションドロワー -->
        <component :is="currentDrawer" v-model="drawer" />

        <!-- メインコンテンツ -->
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";
import ScheduleNavigationDrawer from "./components/ScheduleNavigationDrawer.vue";
import HomeNavigationDrawer from "./components/HomeNavigationDrawer.vue";

const route = useRoute();
const { mdAndUp } = useDisplay();
const drawer = ref(false);

const currentDrawer = computed(() => {
    if (route.name === "home") {
        return HomeNavigationDrawer;
    } else if (route.name === "schedule") {
        return ScheduleNavigationDrawer;
    }
    return null;
});

onMounted(() => {
    if (mdAndUp.value) drawer.value = true;
    else drawer.value = false;
});
watch(mdAndUp, () => {
    drawer.value = mdAndUp.value;
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
    color: #2c3e50;
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
}

.logo {
    height: 70px;
    overflow: hidden;
}
</style>
