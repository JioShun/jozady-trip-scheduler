<template>
    <div class="home">
        <!-- ホームコンテンツ -->
        <div class="home-content">
            <div class="home-content-header">
                <h1>旅のしおり一覧</h1>
                <NewItineraryDialog />
            </div>

            <div class="itineraries">
                <v-container>
                    <v-row justify="start" class="ga-3">
                        <!-- 1つ目のカード -->
                        <v-col cols="auto" v-for="k in 6" :key="k">
                            <ItineraryCard />
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </div>
    </div>
</template>

<script setup>
import NewItineraryDialog from "@/components/NewItineraryDialog.vue";
import ItineraryCard from "@/components/ItineraryCard.vue";
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
