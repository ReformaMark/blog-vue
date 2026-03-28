import api from "@/services/api";

const blogsTableModule = {
    namespaced: true,
    state: {
        headers: [
            { text: 'Id', value: 'id', align: 'center' , width: "80px"},
            { text: 'Image', value: 'image', align: 'center', sortable: false    },
            { text: 'BLOG', value: 'blog', align: 'center', sortable: false},
            { text: 'Comments', value: 'comments', align: 'center',sortable: false  },
            { text: 'Actions', value: 'actions', width: "150px",  align: 'end', sortable: false },

        ],
        items: [],               
        totalItems: 0,   
        itemsPerPage: 15,        // total items on server
        lastPage: 1,
        page: 1,
        search: "",
        loading: false,          // loading spinner
        sortBy: "id",           // column to sort by
        sortDesc: 'desc',         // sort direction
        options: {},    
        pageCache: {} // 1: [...data], 1 = page number, data = blogs which is res.data.data
    },
    mutations: {
        SET_ITEMS(state, items) {
            state.items = items
        },
        SET_TOTAL_ITEMS(state, total) {
            state.totalItems = total
        },
        SET_LOADING(state, status) {
            state.loading = status
        },
        SET_PAGE(state, page) {
            state.page = page
        },
        SET_ITEMS_PER_PAGE(state, count) {
            state.itemsPerPage = count
        },
        SET_SORT(state, { sortBy, sortDesc }) {
            state.sortBy = sortBy
            state.sortDesc = sortDesc
        },
        CACHE_PAGE(state, data) {
            state.pageCache[state.page] = [...data]
        },
        SET_LAST_PAGE(state, currentPage) {
            state.lastPage = currentPage
        },
        SET_OPTIONS(state, newOptions) {
            state.options = newOptions
        },
     
    },
    getters: {
        currentPageData(state) {
            return state.cached_page[state.page] || state.items
        },
        optionsState(state) {
            return state.options
        },
        blogs (state) {
            return state.items
        },
        itemsPerPage (state) {
            return state.itemsPerPage
        },
    },
    actions: {
        async fetchBlogs({ commit, state, rootState}) {
            const query = rootState.blogs.search === null ? "" : rootState.blogs.search;
            const sortDesc = state.options.sortDesc[0] === true ? 'desc': 'asc';
            const itemsPerPage = state.options.itemsPerPage;
            
            commit('SET_LOADING', true)
            try {                // Replace with your API call
                const res = await api.get(`/blogs?page=${state.page}&per_page=${itemsPerPage}&sort_by=${state.sortBy}&sort_desc=${sortDesc}&search=${query}`);
                commit('SET_ITEMS', res.data.data)
                commit('SET_TOTAL_ITEMS', res.data.total)
                commit('CACHE_PAGE', res.data.data)
            } catch (err) {
                console.error('Failed to fetch blogs', err)
            } finally {
                commit('SET_LOADING', false)
            }
        },
        
    }
}

export default blogsTableModule