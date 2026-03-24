// store/modules/comments.js
import api from '@/services/api';

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
    SET_COMMENTS(state, comments) {
      state.comments = comments;
    },
    APPEND_COMMENTS(state, payload) {
      state.comments = [...state.comments, ...payload.data];
      state.pagination.current_page = payload.current_page;
    },
    INCREMENT_PAGE(state) {
      state.pagination.current_page++
    },
    SET_PAGINATION(state, paginationStats) {
      state.pagination = paginationStats
    }
  },
  getters: {
    comments: (state) =>  {
        return state.comments
    },
    nextPage: (state) => {
      return state.pagination.current_page
    },
    paginationStats: (state) => {
      return state.pagination
    }
  },
  actions: {
    async fetchComments({ commit,state }, { blogId, page = 1 }) {
      if (!state.pagination.last_page || page <= state.pagination.last_page) {
        const res = await api.get(`/blogs/${blogId}/comments?page=${page}`);

        if (page === 1) {
          commit('SET_COMMENTS', res.data.data);
        } else {
          commit('APPEND_COMMENTS', res.data.data);
        }

        const paginationStats = {
          current_page: res.data.current_page || 1,
          last_page: res.data.last_page || 1,
          per_page: res.data.per_page || 20,
          total: res.data.total || 1,
        }
      commit('SET_PAGINATION',paginationStats)
      }


    },
    async loadMoreComments({ commit, state }, blogId) {
      if (state.pagination.current_page < state.pagination.last_page) {
        const nextPage = state.pagination.current_page + 1;
        const res = await api.get(`/blogs/${blogId}/comments?page=${nextPage}`);
        commit('APPEND_COMMENTS', res.data);
      } else {
        console.log("already in the last page")
      }
    },
  },
};

export default commentsModule
