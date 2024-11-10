<template>
    <div class="home">
        <!-- ホームコンテンツ -->
        <div class="home-content">
            <div class="home-content-header">
                <h1>旅のしおり一覧</h1>
                <div>
                    <!-- 新規作成ボタン -->
                    <v-btn
                        prepend-icon="add"
                        variant="tonal"
                        size="large"
                        @click="dialog = true"
                        rounded="pill"
                    >
                        新規作成
                    </v-btn>

                    <!-- しおり作成ダイアログ -->
                    <v-dialog v-model="dialog" max-width="500px">
                        <v-card>
                            <v-card-title class="dialog-title">
                                旅のしおりを作成
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-form>
                                        <v-row>
                                            <!-- 旅行名 -->
                                            <v-col>
                                                <v-text-field
                                                    label="旅行名"
                                                    placeholder="新しい旅行"
                                                    variant="outlined"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <!-- 出発日・帰着日 -->
                                            <v-col>
                                                <v-date-input
                                                    label="出発日・帰宅日"
                                                    placeholder="日付を選択"
                                                    prepend-icon=""
                                                    multiple="range"
                                                    variant="outlined"
                                                >
                                                </v-date-input>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <!-- 人数 -->
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    :items="peopleOptions"
                                                    label="人数"
                                                    placeholder="人数 - 未定"
                                                    variant="outlined"
                                                ></v-select>
                                            </v-col>

                                            <!-- 同行者との関係 -->
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    :items="relationshipOptions"
                                                    label="同行者との関係"
                                                    placeholder="同行者 - 未定"
                                                    variant="outlined"
                                                ></v-select>
                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="createItinerary"
                                    >作成</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>
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
import { ref } from "vue";
import { VDateInput } from "vuetify/labs/VDateInput";

// ダイアログの表示状態を管理
const dialog = ref(false);

// ドロップダウンリストのオプション
const peopleOptions = ["1人", "2人", "3人", "4人以上"];
const relationshipOptions = ["友人", "家族", "恋人", "同僚", "その他"];

// 作成ボタンの動作
const createItinerary = () => {
    dialog.value = false;
    // 選択しているオプションを取得
    console.log("旅行名", document.querySelector("input").value);
};
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
}
</style>
