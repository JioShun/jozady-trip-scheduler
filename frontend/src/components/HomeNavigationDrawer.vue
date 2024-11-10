<template>
    <v-navigation-drawer
        app
        width="200"
        color="#fff"
        :temporary="!mdAndUp"
        :permanent="mdAndUp"
    >
        <v-list dense nav>
            <v-list-item
                prepend-icon="list"
                title="しおり一覧"
                value="itineraries"
            ></v-list-item
        ></v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { mdAndUp } = useDisplay();
</script>

<style scoped>
.back-home {
    margin-bottom: 30px;
}
</style>
