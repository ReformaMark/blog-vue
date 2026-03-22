import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#fa8704",
        secondary: "#424242",
        success: "#4CAF50",
        error: "#FF5252",
        warning: "#FFC107",
        info: "#2196F3",
      },
    },
  },
});
