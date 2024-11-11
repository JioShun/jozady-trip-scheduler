import { defineStore } from 'pinia';

export const useItineraryStore = defineStore('itinerary', {
    state: () => ({
        itineraries: [{
            title: "盛岡旅行",
            startDate: "2024-11-04",
            endDate: "2024-11-06",
            people: "2人",
            relationship: "友人"
        },
        {
            title: "名古屋旅行（学会）",
            startDate: "2024-11-04",
            endDate: "2024-11-06",
            people: "2人",
            relationship: "友人"
        },
        {
            title: "インタラクション2024",
            startDate: "2024-11-04",
            endDate: "2024-11-06",
            people: "2人",
            relationship: "友人"
        },
        ],
    }),
    actions: {
        // しおりを追加するアクション
        addItinerary(itinerary) {
            this.itineraries.push(itinerary);
        },

        // しおりを削除するアクション
        removeItinerary(index) {
            this.itineraries.splice(index, 1);
        },
    },
});