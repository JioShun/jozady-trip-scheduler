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
                                    <!-- 旅行名の入力 -->
                                    <v-text-field
                                        label="旅行名"
                                        placeholder="新しい旅行"
                                        variant="outlined"
                                        v-model="newItinerary.title"
                                        :rules="[required]"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <!-- 旅行日程の入力 -->
                                    <v-date-input
                                        label="出発日・帰宅日"
                                        placeholder="日付を選択"
                                        prepend-icon=""
                                        multiple="range"
                                        variant="outlined"
                                        v-model="dateRange"
                                        :rules="[required]"
                                    ></v-date-input>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <!-- 人数の選択 -->
                                    <v-select
                                        :items="peopleOptions"
                                        label="人数"
                                        placeholder="人数 - 未定"
                                        variant="outlined"
                                        v-model="newItinerary.people"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <!-- 同行者との関係の選択 -->
                                    <v-select
                                        :items="relationshipOptions"
                                        label="同行者との関係"
                                        placeholder="同行者 - 未定"
                                        variant="outlined"
                                        v-model="newItinerary.relationship"
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
                        @click="saveNewItinerary"
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
import { useItineraryStore } from "@/stores/itineraryStore";

const { addItinerary } = useItineraryStore(); // ストアから旅行のデータを取得

const dialog = ref(false); // ダイアログの表示状態
const form = ref(false); // 必須のフォームが入力されているかどうか
const newItinerary = ref({
    title: "",
    startDate: "",
    endDate: "",
    people: "",
    relationship: "",
});
const dateRange = ref([]); // 日付だけ別の変数に格納

const peopleOptions = ["1人", "2人", "3人", "4人", "5人以上"];
const relationshipOptions = ["1人旅", "友人", "家族", "恋人", "同僚", "その他"];
const required = (v) => !!v || "必須";

// 作成ボタンがクリックされたときの処理
const saveNewItinerary = () => {
    // 日付の範囲を取得
    if (dateRange.value.length > 0) {
        newItinerary.value.startDate = formatDate(new Date(dateRange.value[0]));
        newItinerary.value.endDate = formatDate(
            new Date(dateRange.value[dateRange.value.length - 1])
        );
    }

    console.log(newItinerary.value); // 入力したデータをコンソールに表示
    addItinerary(newItinerary.value); // ストアに新しいしおりを追加
    dialog.value = false; // ダイアログを閉じる
};

// 日付をフォーマットする関数
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
};
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
