<template>
    <div class="sidebar">
        <div class="sidebar__header">
            <div class="headers">
                <h2>Schedule</h2>
                <p>日程表</p>
            </div>
            <div class="days">
                <button v-for="(day, index) in days" :key="index" :class="['day', { selected: index === selectedDay }]"
                    @click="selectDay(index)">
                    <p>{{ day.name }}</p>
                    <span>{{ day.date }}</span>
                </button>
            </div>
        </div>

        <div class="sidebar__content">
            <VueDraggable v-model="places" :animation="200" ghostClass="ghost">
                <div v-for="(element, index) in places" :key="element.place_index">
                    <place-item :element="element" :removePlace="removePlace" :index="index + 1" />
                </div>
            </VueDraggable>
        </div>
        <div class="add_place">
            <v-btn size="large" color="yellow-darken-4" height="40" append-icon="add" rounded="xl" elevation="8"
                @click="toggleAddSpotSidebar" class="add-spot-btn">スポット</v-btn>
        </div>
    </div>

    <addPlaceSideBar v-if="addSpotSidebar" />
</template>


<script setup>
// eslint-disable-next-line
import { ref, watch, onMounted, provide, computed } from 'vue';
import { VueDraggable } from 'vue-draggable-plus'
import { usePlaceStore } from '@/stores/placeStore';
import placeItem from './placeItem.vue';
import addPlaceSideBar from './addPlaceSideBar.vue';

const { removePlace } = usePlaceStore();
const places = computed(() => usePlaceStore().places);

const days = ref([
    { name: 'Day1', date: '9/3 火' },
    { name: 'Day2', date: '9/4 水' },
    { name: 'Day3', date: '9/5 木' }
]);

const selectedDay = ref(0); // 初期選択された日付（インデックス0が選択された状態）

// ボタンをクリックした際に選択された日付を変更する関数
const selectDay = (index) => {
    selectedDay.value = index;
};

// メインサイドバーと追加サイドバーの状態管理
const addSpotSidebar = ref(false);

// スポット追加サイドバーの開閉
const toggleAddSpotSidebar = () => {
    addSpotSidebar.value = !addSpotSidebar.value;
}




</script>

<style scoped>
.add-spot-btn {
    margin-top: 20px;
}

.title {
    font-weight: bold;
    font-size: 18px;
}


.sidebar {
    width: 100%;
    height: 100%;
    background-color: #f4f4f9;
    display: flex;
    flex-direction: column;
    box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
}

.sidebar__header {
    padding: 20px;
    background-color: #ffed9d;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.headers {
    display: flex;
    align-items: flex-end;
    margin-bottom: 10px;
}

.headers h2 {
    font-size: 36px;
    font-weight: bold;
    margin-right: 10px;
}

.headers p {
    font-size: 16px;
    color: #666;
    padding-bottom: 10px;
}

.sidebar__header h2 {
    font-size: 36px;
    font-weight: bold;
    margin-right: 10px;
}

.sidebar__header p {
    font-size: 16px;
    color: #666;
}

.days {
    display: flex;
    gap: 20px;
}

.day p {
    margin: 0;
}

.day span {
    font-size: 10px;
    color: #666;
}

.day {
    background-color: #f0f0f0;
    padding: 10px 15px;
    border-radius: 8px;
    text-align: center;
    color: #333;
    font-size: 12px;
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
    transform: translateX(80%);
}
</style>