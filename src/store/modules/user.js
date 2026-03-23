// src/store/modules/user.js
import api from '@/services/api' 

const userModule = {
  namespaced: true,
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: JSON.parse(localStorage.getItem('user-token')) || null,
    error: null
  },
  mutations: {
    SET_USER (state, payload) {
      state.user = payload
      localStorage.setItem('user', JSON.stringify(payload))
    },
    CLEAR_USER (state) {
      state.user = null
      localStorage.removeItem('user')
      localStorage.removeItem('user-token')
    },
    SET_TOKEN (state, payload) {
      state.token = payload
      localStorage.setItem('user-token', JSON.stringify(payload))
    },
    SET_ERROR (state, payload) {
      state.error = payload
    }
  },
  getters: {
    getUser: state => state.user,
    hasUser: state => !!state.user,
    isAuthenticated: state => !!state.token
  },
  actions: {
    async register({ commit }, inputData) {
      try {
      
        const response = await api.post('/api/register', inputData)
        commit('SET_USER', response.data.user)
        commit('SET_TOKEN', response.data.token)
        commit('SET_ERROR', null)
        return response.data
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Registration failed')
        throw error
      }
    },
    async login({ commit }, inputData) {
      try {
        const response = await api.post('/login', inputData)
        commit('CLEAR_USER')
        commit('SET_USER', response.data.user)
        commit('SET_TOKEN', response.data.token)
        commit('SET_ERROR', null)
        return response.data
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Login failed')
        throw error
      }
    },
    async logout({ commit }) {
      try {
        await api.post('/logout')
        commit('SET_ERROR', null)
        commit('CLEAR_USER')
        console.log("reached")
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Something went wrong!')
        throw error
      }
    }
  }
}

export default userModule
