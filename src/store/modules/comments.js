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
    APPEND_COMMENTS(state, comments) {
      state.comments = [...state.comments, ...comments];
    },
    INCREMENT_PAGE(state) {
      state.pagination.current_page++
    },
    SET_PAGINATION(state, paginationStats) {
      state.pagination = paginationStats
    },
    SOFT_DELETE_COMMENT(state, commentId) {
      state.comments = state.comments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, deleted: true }
        }
        return comment
      })
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
    async fetchComments({ commit, state }, { blogId, page = 1 }) {
      if (!state.pagination.last_page || page <= state.pagination.last_page) {
        const res = await api.get(`/blogs/${blogId}/comments?page=${page}`);

        if (page === 1) {
          commit('SET_COMMENTS', res.data.data);
        } else {
          commit('APPEND_COMMENTS', res.data.data);
        }

        const paginationStats = {
          current_page: res.data.current_page,
          last_page: res.data.last_page,
          per_page: res.data.per_page,
          total: res.data.total,
        };
        commit('SET_PAGINATION', paginationStats);
      }
    },
    async loadMoreComments({ commit, state }, blogId) {
      if (state.pagination.current_page < state.pagination.last_page) {
        const nextPage = state.pagination.current_page + 1;
        const res = await api.get(`/blogs/${blogId}/comments?page=${nextPage}`);
        commit('APPEND_COMMENTS', res.data.data);

        const paginationStats = {
          current_page: res.data.current_page,
          last_page: res.data.last_page,
          per_page: res.data.per_page,
          total: res.data.total,
        };
        commit('SET_PAGINATION', paginationStats);
      }
    },
    async addComment({commit, state}, payload) {
      console.log("this is the add comment payload:", payload)
        const res = await api.post('/comments', payload)
        const newComment = res.data.comment;
        if(!state.comments){
          commit('SET_COMMENTS', [newComment]); 
        } else {
          if(state.comments.length < 5) {
            commit('APPEND_COMMENTS', [newComment])
          }
        }
    },
    async deleteComment({commit}, commentId) {
      try{
        await api.delete(`/comments/${commentId}`)
        commit('SOFT_DELETE_COMMENT', commentId)
      } catch (error) {
        console.error('Error soft delete comment:', error)
        throw error;
      }
    },
  },
};

export default commentsModule
