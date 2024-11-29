<template>
    <v-navigation-drawer
        :expand-on-hover="mdAndUp"
        :rail="mdAndUp"
        :permanent="mdAndUp"
        :temporary="!mdAndUp"
        class="nav-drawer"
    >
        <v-list>
            <v-list-item
                :prepend-avatar="user.picture"
                :subtitle="user.email"
                :title="user.name"
            ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item
                prepend-icon="schedule"
                title="行程表"
                value="schedule"
            ></v-list-item>
            <v-list-item
                prepend-icon="list"
                title="行きたいところリスト"
                value="goList"
            ></v-list-item>
            <v-list-item
                prepend-icon="calendar_month"
                title="旅行情報"
                value="travelInfo"
            ></v-list-item>
        </v-list>

        <template v-slot:append>
            <v-list-item
                prepend-icon="arrow_back"
                variant="plain"
                title="ホームへ戻る"
                class="back-home"
                value="backHome"
                @click="$router.push('/')"
            ></v-list-item>
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
.nav-drawer {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.back-home {
    margin-bottom: 30px;
}
</style>
