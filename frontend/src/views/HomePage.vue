<template>
    <div class="home">
        <!-- ホームコンテンツ -->
        <div class="home-content">
            <div class="home-content-header">
                <h1>旅のしおり一覧</h1>
                <NewItineraryDialog />
            </div>

            <div class="itineraries">
                <v-container fluid>
                    <v-row justify="start">
                        <!-- 1つ目のカード -->
                        <v-col
                            :cols="xs ? '12' : 'auto'"
                            v-for="itinerary in itinerariesSorted"
                            :key="itinerary.itineraryId"
                        >
                            <ItineraryCard :itinerary="itinerary" />
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";

// コンポーネントのインポート
import NewItineraryDialog from "@/components/NewItineraryDialog.vue";
import ItineraryCard from "@/components/ItineraryCard.vue";
import { useItineraryStore } from "@/stores/itineraryStore";
// import { useUserStore } from "@/stores/userStore";
import { useDisplay } from "vuetify";

const { xs } = useDisplay();
// const { user } = useUserStore();
// const { fetchItinerariesByUser } = useItineraryStore();

// 最初にユーザに合わせた旅行しおりを取得
// (async () => {
//     await fetchItinerariesByUser(user.value.userId);
// })();

// ストアからitinerariesを取得
const itineraries = computed(() => useItineraryStore().itineraries);

// 日付順に並び替えるメソッド
const itinerariesSorted = computed(() => {
    return itineraries.value.slice().sort((a, b) => {
        return new Date(a.startDate) - new Date(b.startDate);
    });
});
</script>

<style scoped>
.home {
    display: flex;
    background-color: #f4f4f9;
    height: 100%;
}

.home-content {
    flex: 1;
    height: 100%;
    padding: 30px;
    background-color: #f4f4f9;
    display: flex;
    flex-direction: column;
}

.home-content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.dialog-title {
    font-size: 24px;
    font-weight: bold;
    background-color: #e4e2dd;
    color: #2c3e50;
    padding: 20px;
    display: flex;
    align-items: center;
}
</style>
