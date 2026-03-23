import api from "@/services/api";

const blogsModule = {
  namespaced: true,
  state: {
    blogs: [],
    blog: null,
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
    }
  
  },
  getters: {
    blogs:(state) => {
      return state.blogs 
    },
    blog: (state) => {
      return state.blog
    }
  },
  actions: {
    setBlog({commit}, blog) {
      console.log("this is in the vuex:", blog)
      commit('SET_BLOG', blog)
    },

    async fetchBlogs({commit}) {
      try{
        const response = await api.get('/blogs')
        commit('SET_BLOGS', response.data)
        return response.data
      } catch (error) {
        console.error('Error fetching blogs:', error)
      }
    },
    async createBlog({commit}, inputData) {
      try{
        const response = await api.post('/blogs', inputData)
        console.log(response.data)
        commit('ADD_BLOG', response.data?.blog)
      } catch (error) {
        console.error('Error creating blogs:', error)
        throw error
      }
    },
    async deleteBlog({commit}, blogId) {
      try{
        await api.delete(`/blogs/${blogId}`)
        commit('REMOVE_BLOG', blogId)
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
    }
  }
}

export default blogsModule