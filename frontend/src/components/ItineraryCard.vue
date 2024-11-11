<template>
    <v-card width="230" elevation="6" rounded="lg">
        <v-img
            class="item-img"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            cover
        />
        <v-card-item>
            <v-card-title>新しい旅行</v-card-title>
            <v-card-subtitle>2024/9/3 ~ 2024/9/5</v-card-subtitle>
            <template v-slot:append>
                <v-btn
                    density="comfortable"
                    icon="more_vert"
                    variant="text"
                ></v-btn>
                <v-menu activator="parent" location="start">
                    <v-list>
                        <v-list-item
                            v-for="(menu, index) in menus"
                            :key="index"
                            @click="selectMenu(menu)"
                        >
                            <v-list-item-title>{{
                                menu.title
                            }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>
        </v-card-item>
    </v-card>
</template>

<script setup>
import { ref } from "vue";
const menus = ref([{ title: "削除" }, { title: "編集" }]);
const selectMenu = (menu) => {
    console.log(menu.title);
};
</script>

<style scoped>
.item-img {
    margin: 15px 15px 0px 15px;
    border-radius: 5px;
}
</style>
