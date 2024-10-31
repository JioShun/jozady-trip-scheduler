<template>
    <div class="sidebar">
        <!-- ヘッダー -->
        <div class="sidebar-header">
            <!-- タイトル -->
            <h2>スポットを追加</h2>
        </div>

        <!-- どこから選ぶかボタン -->
        <v-tabs
            v-model="selected"
            fixed-tabs
            align-tabs="center"
            density="comfortable"
            bg-color="#fff"
        >
            <v-tab>地図から追加</v-tab>
            <v-tab>リストから追加</v-tab>
        </v-tabs>

        <!-- コンテンツ -->
        <v-tabs-window v-model="selected" class="all-content">
            <!-- 地図から追加 -->
            <v-tabs-window-item class="sidebar-content">
                <div class="sidebar-form">
                    <!-- 検索バー -->
                    <div class="search-spot">
                        <v-text-field
                            v-model="placeData.name"
                            append-inner-icon="search"
                            id="search"
                            clearable
                            placeholder=""
                            label="スポットを検索"
                            variant="outlined"
                            rounded="xl"
                        ></v-text-field>
                    </div>

                    <!-- 日付の選択 -->
                    <!-- <div class="date-selector">
                        <v-slide-group
                            show-arrows
                            mandatory
                            center-active
                            v-model="selectedDate"
                            class="date-slide-group"
                        >
                            <v-slide-group-item
                                v-for="date in dateOptions"
                                :key="date"
                                v-slot="{ isSelected, toggle }"
                            >
                                <v-btn
                                    :color="isSelected ? '#ffed9d' : undefined"
                                    class="date-btn"
                                    rounded
                                    @click="toggle"
                                >
                                    {{ date.displayDate }}
                                </v-btn>
                            </v-slide-group-item>
                        </v-slide-group>
                    </div> -->
                    <v-select
                        :items="dateOptions"
                        item-title="displayDate"
                        item-value="date"
                        label="日付を選択"
                        v-model="selectedDate"
                        variant="outlined"
                        rounded="xl"
                        class="date-selector"
                    >
                    </v-select>

                    <!-- 時間の選択 -->
                    <div class="time">
                        <v-text-field
                            v-model="time"
                            append-inner-icon="schedule"
                            clearable
                            dense
                            type="time"
                            variant="outlined"
                            rounded="xl"
                        ></v-text-field>
                    </div>
                    <div class="memo">
                        <v-textarea
                            v-model="memo"
                            label="メモ"
                            variant="outlined"
                            rounded="lg"
                            rows="3"
                            append-inner-icon="edit_note"
                        ></v-textarea>
                    </div>
                </div>
                <div class="add-spot-btn">
                    <v-btn
                        size="large"
                        color="yellow-darken-1"
                        height="40"
                        rounded="xl"
                        elevation="6"
                        @click="addPlaceData"
                    >
                        追加
                    </v-btn>
                </div>
            </v-tabs-window-item>

            <!-- リストから追加 -->
            <v-tabs-window-item class="sidebar-content">
                <p>何もなし</p>
            </v-tabs-window-item>
        </v-tabs-window>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { usePlaceStore } from "@/stores/placeStore";
/* global google */

const { savePlace } = usePlaceStore();
const selected = ref(0); // 0: 地図から追加, 1: リストから追加
const selectedDate = ref(null); // 日付
const time = ref(""); // 時間
const memo = ref(""); // メモ
const placeData = ref({}); // 追加するスポットの情報

const dateOptions = [
    { label: "Day1", date: "2024-09-03", displayDate: "9/3 火" },
    { label: "Day2", date: "2024-09-04", displayDate: "9/4 水" },
    { label: "Day3", date: "2024-09-05", displayDate: "9/5 木" },
    { label: "Day4", date: "2024-09-06", displayDate: "9/6 金" },
];

const searchBox = () => {
    const input = document.getElementById("search");
    const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ["establishment"], // 場所の名前や施設名を優先
        fields: ["place_id", "name", "formatted_address", "geometry", "types"], // 必要なフィールドを指定
    });

    // 選択された場所に基づいて地図の中心を更新
    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
        }

        // placeDataオブジェクトを更新して整形
        placeData.value = {
            place_id: place.place_id,
            name: place.name,
            formatted_address: place.formatted_address,
            location: place.geometry.location,
            types: place.types,
            // photos: place.photos[0],
        };
    });
};

const addPlaceData = () => {
    placeData.value.memo = memo.value;
    placeData.value.datetime = `${selectedDate.value} ${time.value}:00`;

    // データを保存
    savePlace(placeData.value);
    //console.log(placeData.value);

    // データをリセット
    placeData.value = {};
    selectedDate.value = null;
    time.value = "";
    memo.value = "";
};

onMounted(async () => {
    await nextTick(); // レンダリング後に実行
    searchBox();
});
</script>

<style scoped>
.sidebar {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
    padding: 20px;
    background-color: #ffed9d;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    font-weight: bold;
}

.all-content {
    flex: 1;
    height: 100%;
    background-color: #fff;
}

.sidebar-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 40px;
    height: 100%;
}

.sidebar-form {
    flex: 1;
}

.date-btn {
    margin: 5px;
}

/* 矢印ボタンの幅を強制的に小さく */
.v-slide-group__prev,
.v-slide-group__next {
    min-width: 0 !important;
}

.search-spot,
.date-selector,
.time {
    margin-bottom: 20px;
}

.add-spot-btn {
    text-align: end;
    justify-content: flex-end;
}
</style>
