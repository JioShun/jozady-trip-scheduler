<template>
    <v-app>
        <!-- ヘッダー -->
        <v-app-bar ref="a" elevation="0" density="comfortable" color="#e4e2dd">
            <img
                :src="require('@/assets/Jozady.png')"
                alt="Jozady"
                class="logo"
            />
        </v-app-bar>

        <!-- メインコンテンツ -->
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script setup></script>

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
