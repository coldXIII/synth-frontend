import axios from "axios";
import { defineStore } from "pinia";
import type { Band } from "@/types";

type Bands = {
  bands: Band[];
};

export const useBandsStore = defineStore("bands", {
  state: (): Bands => ({
    bands: [],
  }),

  actions: {
    async fetchBandsByUserId() {
      const res = await axios.get("api/user/bands");
      this.$state.bands = res.data;
    },

    bandImage(image: string):string {
      return import.meta.env.VITE_APP_API_URL + image;
    },

    clearBands() {
      this.$state.bands = [];
    },
  },
  persist:true
});
