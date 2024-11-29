<template>
    <v-navigation-drawer
        app
        width="250"
        color="#fff"
        :temporary="!mdAndUp"
        :permanent="mdAndUp"
    >
        <v-list>
            <v-list-item
                :prepend-avatar="user.picture"
                :subtitle="user.email"
                :title="user.name"
            ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list dense nav>
            <v-list-item
                prepend-icon="list"
                title="しおり一覧"
                value="itineraries"
            ></v-list-item
        ></v-list>
        <template v-slot:append>
            <v-list-item
                title="ログアウト"
                prepend-icon="logout"
                variant="plain"
                style="margin-bottom: 30px"
                @click="userStore.logoutUser()"
            >
            </v-list-item>
        </template>
    </v-navigation-drawer>
</template>

<script setup>
import { computed } from "vue";
import { useDisplay } from "vuetify";
import { useUserStore } from "../stores/userStore";
const { mdAndUp } = useDisplay();
const userStore = useUserStore();
const user = computed(() => userStore.user);
</script>

<style scoped>
.back-home {
    margin-bottom: 30px;
}
</style>
