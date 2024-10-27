<template>
    <div class="place-item">
        <!-- ヘッダー（番号・時間） -->
        <div class="item-header">
            <div class="circle-number">{{ props.index }}</div>
            <span class="time">~08:40</span>
        </div>

        <!-- スポット情報（写真・名前・メニューバー） -->
        <div
            class="item-content"
            @click="openInfoWindow(props.element.place_index)"
        >
            <!-- 写真 -->
            <img
                class="place-image"
                :src="
                    props.element.photoUrl
                        ? props.element.photoUrl
                        : require('@/assets/no-image.png')
                "
                alt="Place Photo"
            />

            <!-- 名前・住所 -->
            <div class="place-info">
                <strong class="place-title">{{ props.element.name }}</strong>
                <div class="place-details">
                    <p>{{ props.element.formatted_address }}</p>
                </div>
            </div>

            <!-- メニュー -->
            <div class="schedule-item" ref="menuContainer">
                <!-- メニューボタン -->
                <v-btn
                    density="compact"
                    size="auto"
                    icon="more_vert"
                    variant="text"
                    @click="toggleMenu"
                ></v-btn>

                <!-- メニュー一覧 -->
                <v-menu activator="parent" location="start">
                    <v-list>
                        <v-list-item
                            v-for="(item, index) in menuItems"
                            :key="index"
                            @click="selectMenu(item)"
                        >
                            <v-list-item-title>{{
                                item.title
                            }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </div>

        <!-- 下にカーソルを当てたらプラスボタンが出る -->
        <v-hover v-slot="{ isHovering, props }">
            <div v-bind="props" class="add-spot">
                <v-btn
                    append-icon="add"
                    :density="isHovering ? 'compact' : 'compact'"
                    variant="text"
                    rounded="xl"
                    :class="{
                        'add-spot-button-hover': isHovering,
                        'add-spot-button': !isHovering,
                    }"
                >
                    スポットを追加
                </v-btn>
            </div>
        </v-hover>
    </div>
</template>

<script setup>
// eslint-disable-next-line
import { ref, defineProps, onMounted, onBeforeUnmount } from "vue";
import { useMarkerStore } from "@/stores/markerStore";

const { openInfoWindow } = useMarkerStore();

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
    margin-bottom: 5px;
    background-color: #f9f9f9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
}

.item-content:hover {
    transform: scale(1.05);
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
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

.add-spot {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 15px;
}

.add-spot-button {
    scale: 0.6;
    transition: all 0.3s ease; /* サイズ変化を滑らかにする */
    opacity: 0; /* 最初は非表示 */
}

.add-spot-button-hover {
    scale: 0.7;
    transition: all 0.3s ease; /* ホバー時も滑らかに変化 */
}
</style>
