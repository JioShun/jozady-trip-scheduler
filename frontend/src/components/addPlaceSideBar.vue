<template>
    <div class="add-place-sidebar" :class="{ 'slide-in': isVisible, 'slide-out': !isVisible }">
        <div class="sidebar-header">
            <h2>スポットを検索</h2>
            <button @click="closeSidebar" class="close-btn">×</button>
        </div>

        <div class="sidebar-content">
            <v-text-field v-model="searchQuery" label="スポット名を入力" solo></v-text-field>

            <!-- 検索結果リスト -->
            <v-list dense>
                <v-list-item v-for="(spot, index) in filteredSpots" :key="index" @click="selectSpot(spot)">
                    <v-list-item-content>
                        <v-list-item-title>{{ spot }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </div>

        <div class="sidebar-footer">
            <v-btn color="success" @click="saveSpot">スポットを保存</v-btn>
        </div>
    </div>
</template>

<script setup>
// eslint-disable-next-line
import { ref, watch, computed } from 'vue';

// サイドバーの表示・非表示を管理
const isVisible = ref(true);

// スポットのリストと検索クエリ
const spots = ref(['函館空港', '五稜郭公園', '立待岬']);
const searchQuery = ref('');

// フィルタされたスポット
const filteredSpots = computed(() => {
    return spots.value.filter(spot => spot.includes(searchQuery.value));
});

// 閉じる機能
const closeSidebar = () => {
    isVisible.value = false;
};

// スポットを保存する機能
const saveSpot = () => {
    alert('新しいスポットが保存されました');
    closeSidebar();
};

// スポットを選択する機能（仮）
const selectSpot = (spot) => {
    alert(`${spot} が選択されました`);
};
</script>

<style scoped>
.add-place-sidebar {
    position: fixed;
    top: 0;
    right: -300px;
    /* 初期位置は画面外 */
    width: 300px;
    height: 100vh;
    background-color: #f4f4f9;
    box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
    display: flex;
    flex-direction: column;
    z-index: 1000;
}

.slide-in {
    right: 0;
    /* 表示時は画面内にスライド */
}

.slide-out {
    right: -300px;
    /* 非表示時は画面外 */
}

.sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #ffed9d;
}

.sidebar-header h2 {
    margin: 0;
    font-size: 24px;
}

.close-btn {
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
}

.sidebar-content {
    padding: 20px;
    flex: 1;
    overflow-y: auto;
}

.sidebar-footer {
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}
</style>
