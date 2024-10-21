<template>
    <div class="place-item">
        <div class="item-header">
            <div class="circle-number">{{ props.index }}</div> <!-- 番号 -->
            <span class="time">~08:40</span> <!-- 時間表示 -->
        </div>
        <div class="item-content">
            <img class="place-image"
                :src="props.element.photoUrl ? props.element.photoUrl : require('@/assets/no-image.png')"
                alt="Place Photo" />
            <div class="place-info">
                <strong class="place-title">{{ props.element.name }}</strong>
                <div class="place-details">
                    <p>{{ props.element.formatted_address }}</p>
                </div>
            </div>
            <!-- <button class="remove-button" @click="removePlace(props.element.place_index)"><strong>⋮</strong></button> -->
            <div class="schedule-item" ref="menuContainer">
                <v-btn density="compact" size="auto" icon="more_vert" variant="text" @click="toggleMenu"></v-btn>
                <v-menu activator="parent" location="start">
                    <v-list>
                        <v-list-item v-for="(item, index) in menuItems" :key="index" @click="selectMenu(item)">
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </div>
    </div>
</template>

<script setup>
// eslint-disable-next-line
import { ref, defineProps, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
    element: {
        type: Object,
        required: true,
    },
    removePlace: {
        type: Function,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    },
});

const menuItems = ref([
    { title: "時間の編集" },
    { title: "コメントの編集" },
    { title: "複製" },
    { title: "削除" },
]);

const isMenuOpen = ref(false);
const menuContainer = ref(null);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

// メニュー項目が選択されたときの処理
const selectMenu = (option) => {
    if (option.title === "削除") {
        props.removePlace(props.element.place_index);
    }
    isMenuOpen.value = false; // メニューを閉じる
};

// メニュー外のクリックを検出する関数
const handleClickOutside = (event) => {
    if (menuContainer.value && !menuContainer.value.contains(event.target)) {
        isMenuOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
});


</script>

<style scoped>
.place-item {
    display: flex;
    flex-direction: column;
}

.item-header {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}

.circle-number {
    width: 24px;
    height: 24px;
    background-color: #ffa67a;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: white;
    margin-right: 8px;
}

.time {
    font-size: 14px;
    color: #333;
}

.item-content {
    padding: 7px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 15px;
    background-color: #f9f9f9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
}

.place-image {
    width: 20%;
    aspect-ratio: 2/3;
    overflow: hidden;
    border-radius: 8px;
    object-fit: cover;
}

.place-info {
    padding: 8px;
    flex: 1;
    height: 100%;
}

.place-title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    overflow: hidden;
    font-size: 15px;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
}

.place-details {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
    align-items: center;
    font-size: 12px;
    color: #888;
}

.time-info {
    margin-left: 4px;
}

.remove-button {
    width: 32px;
    height: 32px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #888;
    cursor: pointer;
    padding: 0;
    transition: background-color 0.2s, color 0.2s;
    vertical-align: middle;
    margin: auto;
}

.remove-button:hover {
    background-color: #e0e0e0;
    color: #555;
}

.schedule-item {
    position: relative;
    display: flex;
    align-items: center;
}

.menu-button {
    width: 32px;
    height: 32px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #888;
    cursor: pointer;
    padding: 0;
    transition: background-color 0.2s, color 0.2s;
    vertical-align: middle;
    margin: auto;
}

.menu-button:hover {
    background-color: #e0e0e0;
    color: #555;
}
</style>