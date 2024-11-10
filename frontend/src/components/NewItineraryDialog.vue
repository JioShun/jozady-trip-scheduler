<template>
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
                <v-card-title class="dialog-title"
                    >旅のしおりを作成</v-card-title
                >
                <v-card-text>
                    <v-container>
                        <v-form v-model="form">
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        label="旅行名"
                                        placeholder="新しい旅行"
                                        variant="outlined"
                                        :rules="[required]"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-date-input
                                        label="出発日・帰宅日"
                                        placeholder="日付を選択"
                                        prepend-icon=""
                                        multiple="range"
                                        variant="outlined"
                                        :rules="[required]"
                                    ></v-date-input>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-select
                                        :items="peopleOptions"
                                        label="人数"
                                        placeholder="人数 - 未定"
                                        variant="outlined"
                                    ></v-select>
                                </v-col>
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
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn
                        color="primary"
                        @click="dialog = false"
                        size="large"
                        :disabled="!form"
                        >作成</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { VDateInput } from "vuetify/labs/VDateInput";

const dialog = ref(false);
const form = ref(false);
const peopleOptions = ["1人", "2人", "3人", "4人以上"];
const relationshipOptions = ["友人", "家族", "恋人", "同僚", "その他"];
const required = (v) => !!v || "必須";
</script>

<style scoped>
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
