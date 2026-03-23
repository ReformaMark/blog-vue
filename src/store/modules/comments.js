// store/modules/comments.js
import axios from 'axios';

const commentsModule = {
  namespaced: true,
  state: {
    comments: [],
    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 20,
      total: 0,
    },
  },
  mutations: {
    SET_COMMENTS(state, payload) {
      state.comments = payload.data;
      state.pagination = {
        current_page: payload.current_page,
        last_page: payload.last_page,
        per_page: payload.per_page,
        total: payload.total,
      };
    },
    APPEND_COMMENTS(state, payload) {
      state.comments = [...state.comments, ...payload.data];
      state.pagination.current_page = payload.current_page;
    },
  },

  getters: {
    comments: (state) =>  {
        return state.comments
    }
  },
  actions: {
    async fetchComments({ commit }, { blogId, page = 1 }) {
      const res = await axios.get(`/blogs/${blogId}/comments?page=${page}`);
      commit('SET_COMMENTS', res.data);
    },
    async loadMoreComments({ commit, state }, blogId) {
      if (state.pagination.current_page < state.pagination.last_page) {
        const nextPage = state.pagination.current_page + 1;
        const res = await axios.get(`/blogs/${blogId}/comments?page=${nextPage}`);
        commit('APPEND_COMMENTS', res.data);
      }
    },
  },
};

export default commentsModule
