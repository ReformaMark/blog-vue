import api from "@/services/api";

const blogsModule = {
  namespaced: true,
  state: {
    blogs: [],
    blog: null,
    pagination:  {
      current_page: 1,
      last_page: 1,
      per_page: 20,
      total: 0,
    },
    isEditing: false,
  },
  mutations: {
    SET_BLOGS (state, blogs) {
      state.blogs = blogs;
    },
    ADD_BLOG (state, blog) {
      state.blogs.push(blog)
    },
    REMOVE_BLOG(state, blogId) {
      state.blogs = state.blogs.filter(blog => blog.id !== blogId)
    },
    SET_BLOG(state, blog) {
      state.blog = blog
    },
    UPDATE_BLOG(state, updatedBlog) {
      state.blogs = state.blogs.map(blog =>
        blog.id === updatedBlog.id ? updatedBlog : blog)
    },
    SET_PAGINATION(state, paginationStats) {
      state.pagination = paginationStats
    },
    APPEND_BLOGS(state, blogs) {
      state.blogs = [...state.blogs, ...blogs];
    },

    SET_EDITING (state, editing) {
      state.isEditing = editing
    }
 
  
  },
  getters: {
    blogs:(state) => {
      return state.blogs 
    },
    blog: (state) => {
      return state.blog
    },
    paginationStats: (state) => {
      return state.pagination
    },
    editing:(state) =>  {
      return state.isEditing
    }
  },
  actions: {
    setBlog({commit}, blog) {
      commit('SET_BLOG', blog)
    },
    async fetchBlogs({commit}) {
      const page = 1;
      const per_page = 6;
      try{
        const response = await api.get(`/blogs?page=${page}&per_page=${per_page}`);
        if (page === 1) {
          commit('SET_BLOGS', response.data.data)
        } else {
          commit('APPEND_BLOGS', response.data.data);
        }
        const paginationStats = {
          current_page: response.data.current_page,
          last_page: response.data.last_page,
          per_page: response.data.per_page,
          total: response.data.total,
        };
        commit('SET_PAGINATION', paginationStats);
      } catch (error) {
        console.error('Error fetching blogs:', error)
      }
    },
    async loadMoreBlogs({commit, state}) {
       if (state.pagination.current_page < state.pagination.last_page) {
        const nextPage = state.pagination.current_page + 1;
        const res = await api.get(`/blogs?page=${nextPage}`);
        commit('APPEND_BLOGS', res.data.data);

        const paginationStats = {
          current_page: res.data.current_page,
          last_page: res.data.last_page,
          per_page: res.data.per_page,
          total: res.data.total,
        };
        commit('SET_PAGINATION', paginationStats);
      }
    },
    async createBlog({commit}, inputData) {
      try{
        const response = await api.post('/blogs', inputData)
        commit('ADD_BLOG', response.data?.blog)
      } catch (error) {
        console.error('Error creating blogs:', error)
        throw error
      }
    },
    async deleteBlog({commit}, blogId) {
      try{
        const res = await api.delete(`/blogs/${blogId}`)
        commit('REMOVE_BLOG', blogId)
        if(res.status == 200) commit('DECREMENT_TOTAL');
      } catch (error) {
        console.error('Error removing blogs:', error)
        throw error;
      }
    },
    async updateBlog({commit}, {blogId, data}) {
      try{
        const response = await api.put(`/blogs/${blogId}`, data )
        commit('UPDATE_BLOG', response.data?.blog)
      } catch (error) {
        console.error('Error removing blogs:', error)
        throw error;
      }
    },
    async uploadPhoto(formData) {
      const userToken = localStorage.getItem('user-token')
      if (userToken) {
        const cleanToken = userToken.replace(/^"|"$/g, '') // remove  the ""
        await api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${cleanToken}`
          }
        
        });
      }
    },
    async fetchBlog({commit},blogId) {
      try {
        const res = await api.get(`/blogs/${blogId}`)
        const blog = res.data
        commit('SET_BLOG', blog)
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    setEditing({commit}, editing) {
      commit('SET_EDITING', editing)
    }
  }
}

export default blogsModule