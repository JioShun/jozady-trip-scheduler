<template>
    <v-card
        width="220"
        elevation="6"
        rounded="lg"
        class="itinerary-card"
        :class="xs ? 'w-100' : ''"
        @click="goToSchedule(props.itinerary.itineraryId)"
    >
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
                    size="small"
                    icon="more_vert"
                    variant="text"
                ></v-btn>
                <v-menu activator="parent" location="start">
                    <v-list>
                        <v-list-item
                            v-for="menu in menus"
                            :key="menu.title"
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
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";
const { xs } = useDisplay();

const { removeItinerary } = useItineraryStore(); // ストアから旅行のデータを取得
const router = useRouter();

// メニューのリスト
const menus = ref([{ title: "削除" }, { title: "編集" }]);

// propsの定義
const props = defineProps({
    itinerary: {
        type: Object,
        required: true,
    },
});

const displayDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
};

const selectMenu = (menu) => {
    if (menu.title === "削除") {
        removeItinerary(props.itinerary.itineraryId);
    }
};

// 各旅程のスケジュールに移動するメソッド
const goToSchedule = (itineraryId) => {
    router.push({ name: "schedule", params: { itineraryId } });
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

@media screen and (max-width: 600px) {
    .itinerary-card:hover {
        transform: none;
    }
}

.itinerary-card:hover {
    transform: scale(1.05);
}

.title {
    font-size: 14px;
    margin-bottom: 5px;
}

.subtitle {
    font-size: 13px;
}
</style>
