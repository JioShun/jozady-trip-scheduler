<template>
    <v-navigation-drawer class="nav-drawer">
        <v-list density="compact" nav>
            <v-list-item
                prepend-icon="list"
                title="しおり一覧"
                value="itineraries"
            ></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup></script>

<style scoped>
.nav-drawer {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.back-home {
    margin-bottom: 30px;
}
</style>
