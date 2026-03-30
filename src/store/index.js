
import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/user'
import blogsModule from './modules/blogs'
import commentsModule from './modules/comments'
import blogsTableModule from './modules/dataTable'
import snackbarModule from './modules/snackbar'

Vue.use(Vuex)


export default new Vuex.Store({ 
  modules: {
    user: userModule,
    blogs: blogsModule,
    comments: commentsModule,
    blogsTable: blogsTableModule,
    snackbarModule
  }
})
