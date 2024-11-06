<template>
    <v-navigation-drawer expand-on-hover rail class="nav-drawer">
        <v-list>
            <v-list-item
                prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                subtitle="sandra_a88@gmailcom"
                title="Sandra Adams"
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
            ></v-list-item>
        </template>
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
