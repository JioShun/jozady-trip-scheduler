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
                    <v-row justify="start">
                        <!-- 1つ目のカード -->
                        <v-col cols="auto" v-for="k in 6" :key="k">
                            <v-card class="mx-auto" max-width="300">
                                <v-img
                                    height="200px"
                                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                                    cover
                                ></v-img>

                                <v-card-title>
                                    Top western road trips
                                </v-card-title>

                                <v-card-subtitle>
                                    1,000 miles of wonder
                                </v-card-subtitle>

                                <v-card-actions>
                                    <v-btn
                                        color="orange-lighten-2"
                                        text="Explore"
                                    ></v-btn>

                                    <v-spacer></v-spacer>

                                    <v-btn icon="menu"></v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </div>
    </div>
</template>

<script setup>
import NewItineraryDialog from "@/components/NewItineraryDialog.vue";
</script>

<style scoped>
.home {
    display: flex;
    background-color: #f4f4f9;
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
