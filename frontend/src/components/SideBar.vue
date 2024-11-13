<template>
    <div class="sidebar">
        <!-- ヘッダー -->
        <div class="sidebar-header">
            <!-- タイトル -->
            <div class="header-item">
                <h2>Schedule</h2>
                <p>日程表</p>
            </div>

            <!-- 日付選択 -->
            <div class="days">
                <button
                    v-for="(day, index) in days"
                    :key="index"
                    :class="['day', { selected: index === selectedDay }]"
                    @click="selectDay(index)"
                >
                    <p>{{ day.name }}</p>
                    <span>{{ day.displayDate }}</span>
                </button>
            </div>
        </div>

        <!-- コンテンツ -->
        <div class="sidebar__content">
            <!-- スケジュール -->
            <!-- <VueDraggable
                v-model="filteredPlaces"
                :animation="200"
                ghostClass="ghost"
            > -->
            <div
                v-for="(element, index) in filteredPlaces"
                :key="element.place_index"
            >
                <placeItem
                    :element="element"
                    :removePlace="removePlace"
                    :index="index + 1"
                    @toggleAddPlaceSidebar="toggleAddPlaceSidebar"
                />
            </div>
            <!-- </VueDraggable> -->
            <div class="button-space"></div>
        </div>

        <!-- スポット追加ボタン -->
        <div class="add_place">
            <v-btn
                size="large"
                color="yellow-darken-4"
                height="40"
                append-icon="add"
                rounded="xl"
                elevation="6"
                @click="toggleAddPlaceSidebar"
                class="add-spot-btn"
            >
                スポット
            </v-btn>
        </div>
    </div>

    <!-- スポット追加サイドバー -->
    <v-navigation-drawer
        v-model="addPlaceSidebar"
        location="right"
        temporary
        width="400"
        :scrim="false"
        style="z-index: 1"
    >
        <AddPlaceSideBar @toggleAddPlaceSidebar="toggleAddPlaceSidebar" />
        <v-btn
            icon="close"
            variant="plain"
            size="regular"
            class="close-add-place-sidebar-button"
            @click="toggleAddPlaceSidebar"
        ></v-btn>
    </v-navigation-drawer>
</template>

<script setup>
// eslint-disable-next-line
import { ref, watch, onMounted, provide, computed } from "vue";
// import { VueDraggable } from "vue-draggable-plus";
import { usePlaceStore } from "@/stores/placeStore";
import placeItem from "./PlaceItem.vue";
import AddPlaceSideBar from "./AddPlaceSideBar.vue";
import { useItineraryStore } from "@/stores/itineraryStore";

const { removePlace } = usePlaceStore();
const places = computed(() => usePlaceStore().places);

import { useRoute } from "vue-router";
const route = useRoute();
const id = route.params.itineraryId;
const days = ref(useItineraryStore().generateDateList(id));

const selectedDay = ref(0); // 選択された日付

// ボタンをクリックした際に選択された日付を変更する関数
const selectDay = (index) => {
    selectedDay.value = index;
};

const addPlaceSidebar = ref(false);

// スポット追加サイドバーの開閉
const toggleAddPlaceSidebar = () => {
    addPlaceSidebar.value = !addPlaceSidebar.value;
};

// ソートされたplacesを返すcomputedプロパティ
const sortedPlaces = computed(() => {
    return places.value.slice().sort((a, b) => {
        return new Date(a.datetime) - new Date(b.datetime);
    });
});

const filteredPlaces = computed(() => {
    return sortedPlaces.value.filter(
        (place) =>
            place.datetime.split(" ")[0] === days.value[selectedDay.value].date1
    );
});
</script>

<style scoped>
.sidebar {
    width: 100%;
    height: 100%;
    background-color: #f4f4f9;
    display: flex;
    flex-direction: column;
    position: relative;
}

.add_place {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}

.sidebar-header {
    padding: 20px;
    padding-top: 10px;
    /* background-color: #fff2b9; */
    background-color: #fff;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);
}

.header-item {
    display: flex;
    align-items: flex-end;
    margin-bottom: 10px;
}

.header-item h2 {
    font-size: 30px;
    font-weight: bold;
    margin-right: 10px;
}

.header-item p {
    font-size: 14px;
    color: #666;
    padding-bottom: 8px;
}

.days {
    display: flex;
    gap: 20px;
}

.day p {
    margin: 0;
}

.day span {
    font-size: 12px;
    color: #666;
}

.day {
    background-color: #f0f0f0;
    padding: 7px 12px;
    border-radius: 8px;
    text-align: center;
    color: #333;
    font-size: 14px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.days :hover {
    background-color: #c8c8c8;
}

.day.selected {
    background-color: #ffa67a;
}

.day.selected :hover {
    background-color: #ffa67a;
}

.sidebar__content {
    padding: 20px;
    overflow-y: auto;
    flex: 1;
}

.ghost,
.ghost * {
    opacity: 0;
    background: #fbf4c8;
}

.add_place {
    position: absolute;
    bottom: 20px;
    transform: translateX(-50%);
}

.button-space {
    height: 40px;
}

.hover-area {
    width: 200px;
    height: 100px;
    background-color: #f0f0f0;
}

.hover-button {
    bottom: 10px;
    right: 10px;
    transition: opacity 0.3s;
}

.close-add-place-sidebar-button {
    position: absolute;
    top: 15px;
    right: 20px;
    color: #333;
}

.drawer {
    z-index: 1;
}
</style>
