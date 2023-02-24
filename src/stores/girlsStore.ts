import { defineStore } from "pinia";

type Girl = {
  name: string;
  image: string;
  url: string;
};

type Girls = {
  girls: Girl[];
};

export const useGirlsStore = defineStore({
  id: "Girls",
  state(): Girls {
    return {
      girls: [
        {
          name: "Opale",
          image: "girls/opale.webp",
          url: "https://www.youtube.com/watch?v=gYwlhIM4sMg",
        },
        {
          name: "Bertine Zetlitz",
          image: "girls/bertine.webp",
          url: "https://www.youtube.com/watch?v=Cio5P-VE-CM",
        },
        {
          name: "Black Nail Cabaret",
          image: "girls/black.webp",
          url: "https://www.youtube.com/watch?v=Yj1RGifPEpwg",
        },
        {
          name: "Client",
          image: "girls/client.webp",
          url: "https://www.youtube.com/watch?v=yvY7BYhuJD8",
        },
        {
          name: "Foretaste",
          image: "girls/foretaste.webp",
          url: "https://www.youtube.com/watch?v=s6E8MR4yyu0",
        },
        {
          name: "Echoberyl",
          image: "girls/echoberyl.webp",
          url: "https://www.youtube.com/watch?v=tl0zfcOau_E",
        },

        {
          name: "Keep Shelly in Athens",
          image: "girls/shelly.webp",
          url: "https://www.youtube.com/watch?v=a4TQt1s-Go0",
        },
        {
          name: "Daybehavior",
          image: "girls/daybehavior.webp",
          url: "https://www.youtube.com/watch?v=a4TQt1s-Go0",
        },
      ],
    };
  },
  persist: true,
});
