<template>
    <div class="sidebar">
        <div class="sidebar-header">
            <div class="header-item">
                <h2><strong>スポットを追加</strong></h2>
            </div>
        </div>

        <div class="sidebar-content">
            <!-- どこから選ぶかボタン -->
            <v-btn-toggle
                rounded="0"
                mandatory
                class="add-spot-option"
                density="comfortable"
            >
                <v-btn class="button-option"> 地図から追加 </v-btn>
                <v-btn class="button-option"> リストから追加 </v-btn>
            </v-btn-toggle>

            <!-- スポット追加のための入力フォーム -->
            <div class="sidebar-form">
                <!-- 検索バー -->
                <div class="search-spot">
                    <v-text-field
                        append-inner-icon="search"
                        id="a"
                        variant="outlined"
                        clearable
                        dense
                    ></v-text-field>
                </div>
                <!-- 日付の選択 -->
                <div class="date">
                    <input type="date" />
                </div>
                <!-- 時間選択 -->
                <div class="time">
                    <input type="time" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
/* global google */

onMounted(() => {
    const input_a = document.getElementById("a");
    const autocomplete_a = new google.maps.places.Autocomplete(input_a);

    // 選択された場所に基づいて地図の中心を更新
    autocomplete_a.addListener("place_changed", () => {
        const place = autocomplete_a.getPlace();

        if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
        }

        console.log("Place selected:", place.name);
    });
});
</script>

<style scoped>
.sidebar {
    width: 100%;
    height: 100%;
    background-color: #f4f4f9;
    display: flex;
    flex-direction: column;
}

.sidebar-header {
    padding: 10px;
    background-color: #ffed9d;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.sidebar-content {
    height: 100%;
    background-color: #ffffff;
}

.add-spot-option {
    display: flex;
    width: 100%;
}

.button-option {
    flex: 1; /* ボタンが均等に伸びる */
}

.sidebar-form {
    padding: 10px;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
}

.sidebar-form input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
}
</style>
