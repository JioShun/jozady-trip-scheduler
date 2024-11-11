<template>
    <v-card width="230" elevation="6" rounded="lg" class="itinerary-card">
        <v-img
            class="item-img"
            height="200px"
            :src="`https://picsum.photos/200/300?random=${Math.random()}`"
            cover
        />
        <v-card-item>
            <v-card-title class="title">{{
                props.itinerary.title
            }}</v-card-title>
            <v-card-subtitle class="subtitle"
                >{{ displayDate(props.itinerary.startDate) }} ~
                {{ displayDate(props.itinerary.endDate) }}</v-card-subtitle
            >
            <template v-slot:append>
                <v-btn
                    density="compact"
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
import { ref, defineProps } from "vue";
import { useItineraryStore } from "@/stores/itineraryStore";

const { deleteItinerary } = useItineraryStore(); // ストアから旅行のデータを取得

// メニューのリスト
const menus = ref([{ title: "削除" }, { title: "編集" }]);

// propsの定義
const props = defineProps({
    itinerary: {
        type: Object,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    },
});

const displayDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
};

const selectMenu = (menu) => {
    if (menu.title === "削除") {
        deleteItinerary(props.index);
    }
};
</script>

<style scoped>
.item-img {
    margin: 15px 15px 0px 15px;
    border-radius: 5px;
}

.itinerary-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.itinerary-card:hover {
    transform: scale(1.05);
}

.title {
    font-size: 15px;
    margin-bottom: 5px;
}

.subtitle {
    font-size: 13px;
}
</style>
