<template>
    <div class="container">
        <!-- ナビゲーションドロワー -->
        <div class="nav-drawer">
            <HomeNavigationDrawer />
        </div>
        <div class="itineraries"></div>
    </div>
</template>

<script setup>
import HomeNavigationDrawer from "@/components/HomeNavigationDrawer.vue";
</script>

<style scoped>
.container {
    display: flex;
}

.nav-drawer {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.itineraries {
    flex: 1;
    height: 100vh;
    padding: 20px;
    background-color: #f4f4f9;
}
</style>
