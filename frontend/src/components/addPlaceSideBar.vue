<template>
    <div class="sidebar">
        <div class="sidebar__header">
            <div class="header-item">
                <h2><strong>スポットを追加</strong></h2>
            </div>
        </div>

        <div class="sidebar__content">
            <!-- どこから選ぶかボタン -->
            <div class="add-spot-option">
                <v-btn class="button-option"> 地図から追加 </v-btn>
                <v-btn class="button-option"> リストから追加 </v-btn>
            </div>

            <!-- スポット追加のための入力フォーム -->
            <div class="sidebar-form">
                <!-- 検索バー -->
                <div class="search-spot">
                    <v-text-field
                        prepend-inner-icon="search"
                        dense
                        placeholder="スポット名を入力"
                    ></v-text-field>
                </div>

                <!-- 時間選択 -->
                <div class="time">
                    <input type="time" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup></script>

<style scoped>
.sidebar {
    width: 100%;
    height: 100%;
    background-color: #f4f4f9;
    display: flex;
    flex-direction: column;
}

.sidebar__header {
    padding: 10px;
    background-color: #ffed9d;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: #ffed9d;
}

.search-spot {
}

.time {
}
</style>
