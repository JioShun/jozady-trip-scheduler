<template>
    <div class="sidebar">
        <!-- ヘッダー -->
        <div class="sidebar-header">
            <!-- タイトル -->
            <div class="header-item">
                <h2>スポットを追加</h2>
            </div>
        </div>

        <!-- どこから選ぶかボタン -->
        <v-tabs
            v-model="selected"
            fixed-tabs
            align-tabs="center"
            density="comfortable"
        >
            <v-tab>地図から追加</v-tab>
            <v-tab>リストから追加</v-tab>
        </v-tabs>

        <v-tabs-window v-model="selected">
            <!-- 地図から追加のタブ内容 -->
            <v-tabs-window-item class="sidebar-content">
                <!-- スポット追加のための入力フォーム -->
                <div class="sidebar-form">
                    <!-- 検索バー -->
                    <div class="search-spot">
                        <v-text-field
                            append-inner-icon="search"
                            id="search"
                            variant="outlined"
                            clearable
                            dense
                        ></v-text-field>
                    </div>

                    <!-- 日付の選択 -->
                    <div class="date-selector">
                        <v-slide-group
                            v-model="selectedDate"
                            show-arrows
                            class="date-slide-group"
                        >
                            <v-slide-item
                                v-for="(day, index) in dateOptions"
                                :key="index"
                                :value="day.date"
                            >
                                <v-card
                                    :class="{
                                        'selected-date':
                                            selectedDate === day.date,
                                    }"
                                    class="date-card"
                                    @click="selectDate(day.date)"
                                    flat
                                >
                                    <v-card-text class="text-center">
                                        <div class="day-label">
                                            {{ day.label }}
                                        </div>
                                        <div class="day-date">
                                            {{ day.displayDate }}
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </v-slide-item>
                        </v-slide-group>
                    </div>
                </div>
            </v-tabs-window-item>

            <!-- リストから追加のタブ内容 -->
            <v-tabs-window-item class="sidebar-content">
                <v-list>
                    <v-list-item-group>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>スポット1</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>スポット2</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>スポット3</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-tabs-window-item>
        </v-tabs-window>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
/* global google */

const selected = ref(0);
const selectedDate = ref(null);
const dateOptions = [
    { label: "Day1", date: "2024-09-03", displayDate: "9/3 火" },
    { label: "Day2", date: "2024-09-04", displayDate: "9/4 水" },
    { label: "Day3", date: "2024-09-05", displayDate: "9/5 木" },
    { label: "Day3", date: "2024-09-05", displayDate: "9/5 木" },
    { label: "Day3", date: "2024-09-05", displayDate: "9/5 木" },
    // 必要に応じて他の日付も追加
];

const searchBox = () => {
    const input = document.getElementById("search");
    const autocomplete = new google.maps.places.Autocomplete(input);

    // 選択された場所に基づいて地図の中心を更新
    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
        }

        console.log("Place selected:", place.name);
    });
};

onMounted(() => {
    searchBox();
});
</script>

<style scoped>
.sidebar {
    width: 100%;
    height: 100%;
    background-color: #f4f4f9;
    display: flex;
    flex-direction: column;
    box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
    padding: 20px;
    background-color: #ffed9d;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.header-item {
    display: flex;
    align-items: flex-end;
}

.header-item h2 {
    font-size: 30px;
    font-weight: bold;
}

.sidebar-content {
    padding: 20px;
    height: 100%;
    background-color: #fff;
}

.date-selector {
    background-color: #fff7cc;
    padding: 20px;
}

.date-slide-group {
    display: flex;
    align-items: center;
}

.date-card {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    background-color: #f5f5f5;
}

.selected-date {
    background-color: #f4a261; /* 選択時の色 */
    color: #ffffff;
}

.day-label {
    font-size: 18px;
    font-weight: bold;
}

.day-date {
    font-size: 14px;
    color: #666666;
}
</style>
