

const snackbarModule = { 
    state: {
        snackbar: false,
        snackbarMessage: "",
        snackbarColor: "success",
    },
    mutations: {

        SHOW_SNACKBAR(state, { message, color }) {
            state.snackbarMessage = message
            state.snackbarColor = color || "success"
            state.snackbar = true
        },
        HIDE_SNACKBAR(state) {
            state.snackbar = false
            state.snackbarMessage = ""
            state.snackbarColor = "success"
        }   


    },
    getters: {
        snackbar(state) {
            return state.snackbar
        },
        snackbarMessage(state) {
            return state.snackbarMessage
        },
        snackbarColor(state) {
            return state.snackbarColor
        }
    },
    actions: {
        showSnackbar({ commit }, { message, color }) {
            commit('SHOW_SNACKBAR', { message, color })
            setTimeout(() => {
                commit('HIDE_SNACKBAR')
            }, 3000) // Snackbar will disappear after 3 seconds
        },
        hideSnackbar({ commit }) {
            commit('HIDE_SNACKBAR')
        }   
    }

}

export default snackbarModule