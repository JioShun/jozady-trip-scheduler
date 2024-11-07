<template>
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
</template>

<script setup>
import GoogleMap from "@/components/GoogleMap.vue";
import SideBar from "@/components/SideBar.vue";
import NavigationDrawer from "@/components/ScheduleNavigationDrawer.vue";
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
