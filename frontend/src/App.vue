<template>
    <v-app>
        <!-- ヘッダー -->
        <v-app-bar ref="a" icon="menu" elevation="0" density="comfortable">
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-app-bar-title>スケジュール作成</v-app-bar-title>
        </v-app-bar>

        <!-- メインコンテンツ -->
        <v-main>
            <div class="container">
                <!-- ナビゲーションドロワー -->
                <div class="nav-drawer">
                    <NavigationDrawer />
                </div>

                <!-- マップ -->
                <div class="map">
                    <GoogleMap />
                </div>

                <!-- サイドバー（行程表） -->
                <div class="side">
                    <SideBar />
                </div>
            </div>
        </v-main>
    </v-app>
</template>

<script setup>
import GoogleMap from "./components/GoogleMap.vue";
import SideBar from "./components/SideBar.vue";
import NavigationDrawer from "./components/NavigationDrawer.vue";
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
