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
            class="sidebar-tabs"
        >
            <v-tab>地図から追加</v-tab>
            <v-tab>リストから追加</v-tab>
        </v-tabs>

        <!-- コンテンツ -->
        <v-tabs-window v-model="selected" class="all-content">
            <!-- 地図から追加 -->
            <v-tabs-window-item class="sidebar-content">
                <v-form
                    :key="key"
                    ref="reset"
                    v-model="form"
                    @submit.prevent="
                        () => {
                            addPlaceData();
                            toggleAddPlaceSidebar();
                        }
                    "
                    class="sidebar-form"
                >
                    <!-- 検索バー -->
                    <div class="search-spot">
                        <v-text-field
                            v-model="placeData.name"
                            append-inner-icon="search"
                            id="search"
                            clearable
                            placeholder=""
                            label="スポットを検索"
                            variant="solo"
                            rounded="lg"
                            :rules="[required]"
                        ></v-text-field>
                    </div>

                    <!-- 日付選択 -->
                    <v-select
                        :items="dateOptions"
                        item-title="displayDate"
                        item-value="date"
                        label="日付を選択"
                        v-model="selectedDate"
                        variant="solo"
                        rounded="lg"
                        class="date-selector"
                        :rules="[required]"
                    >
                    </v-select>

                    <!-- 時間選択 -->
                    <div class="time">
                        <v-text-field
                            v-model="time"
                            append-inner-icon="schedule"
                            clearable
                            dense
                            label="時間を選択"
                            type="time"
                            variant="solo"
                            rounded="lg"
                            :rules="[required]"
                        ></v-text-field>
                    </div>
                    <div class="memo">
                        <v-textarea
                            v-model="memo"
                            label="メモ"
                            variant="solo"
                            rounded="lg"
                            rows="6"
                            append-inner-icon="edit_note"
                        ></v-textarea>
                    </div>

                    <div class="add-spot-btn">
                        <v-btn
                            type="submit"
                            size="x-large"
                            color="yellow-darken-3"
                            height="40"
                            rounded="lg"
                            elevation="6"
                            :disabled="!form"
                            block
                        >
                            追加
                        </v-btn>
                    </div>
                </v-form>
            </v-tabs-window-item>

            <!-- リストから追加 -->
            <v-tabs-window-item class="sidebar-content">
                <p>何もなし</p>
            </v-tabs-window-item>
        </v-tabs-window>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, defineEmits, watch } from "vue";
import { usePlaceStore } from "@/stores/placeStore";
/* global google */

const { savePlace } = usePlaceStore();
const selected = ref(0); // 0: 地図から追加, 1: リストから追加
const selectedDate = ref(null); // 日付
const time = ref(""); // 時間
const memo = ref(""); // メモ
const placeData = ref({}); // 追加するスポットの情報

const emit = defineEmits(["toggleAddPlaceSidebar"]);
const toggleAddPlaceSidebar = () => {
    emit("toggleAddPlaceSidebar");
};

const key = ref(0);
const reset = ref(null);
const form = ref(false);
const required = (v) => !!v || "必須";

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

    // フォームをリセット
    reset.value.reset();
    reset.value.resetValidation();

    // フォームのkeyを変更して再描画
    key.value += 1; //timeの必須だけリセットされないのでkeyを変更して無理やり再描画
};

// 時間が変更されたときにメモを更新
watch(time, (newTime) => {
    if (newTime) {
        memo.value = `${newTime} 到着`;
    } else {
        memo.value = "";
    }
});

onMounted(async () => {
    await nextTick(); // レンダリング後に実行
    searchBox();
});
</script>

<style scoped>
.sidebar {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
    padding: 10px;
    background-color: #fff;
    font-weight: bold;
}

.sidebar-tabs {
    box-shadow: 0px 5px 10px -6px rgba(0, 0, 0, 0.2);
}

.all-content {
    height: 100%;
    flex: 1;
}

.sidebar-content {
    display: flex;
    flex-direction: column;
    padding: 40px 30px;
    height: 100%;
}

.sidebar-form {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.sidebar-form > * {
    flex: none;
}

.date-btn {
    margin: 5px;
}

/* 矢印ボタンの幅を強制的に小さく */
.v-slide-group__prev,
.v-slide-group__next {
    min-width: 0 !important;
}

.add-spot-btn {
    margin-top: auto;
    margin-left: auto;
}
</style>
