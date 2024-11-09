<template>
    <div class="home">
        <!-- ナビゲーションドロワー -->
        <div class="nav-drawer">
            <HomeNavigationDrawer />
        </div>

        <!-- ホームコンテンツ -->
        <div class="home-content">
            <h1>旅のしおり一覧</h1>

            <div class="itineraries">
                <v-container>
                    <v-row justify="start">
                        <!-- 1つ目のカード -->
                        <v-col cols="auto" v-for="k in 10" :key="k">
                            <v-card class="mx-auto" max-width="344">
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
import HomeNavigationDrawer from "@/components/HomeNavigationDrawer.vue";
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
</style>
