import axios from 'axios';

export const postsModule = {

    state: () => ({
        posts: [],
        isPostsLoading: false,
        selectedSort: '',
        searchText: '',
        limit: 10,
        page: 1,  
        totalPages: 0,        
        sortOptions: [
            {value: 'title', name: 'By title'},
            {value: 'body', name: 'By body'}
        ]
    }),

    getters: {
        readyPosts(state, getters) {
            const strSearch = state.searchText.toLowerCase();
            return [...state.posts]
                .filter(i => i.title.toLowerCase().includes(strSearch) 
                                ||  i.body.toLowerCase().includes(strSearch) )
                .sort( (a, b) => a[state.selectedSort]?.localeCompare(b[state.selectedSort]) );
        },
    },

    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },

        setLoading(state, bool) {
            state.isPostsLoading = bool;
        },

        setPage(state, page) {
            state.page = page;
        },

        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },

        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        },

        setSearchText(state, searchText) {
            state.searchText = searchText;
        }
    },

    actions: {
        async fetchPosts({state, commit}) {
            try {
                // this.isPostsLoading = true;
                commit('setLoading', true);

                const response = await axios.get('https://jsonplaceholder.typicode.com/posts',
                        {   
                            params: {
                                _page: state.page,
                                _limit: state.limit
                            }
                        });
                
                // this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
                // this.posts = response.data;
                commit('setPosts', response.data);
      
            } catch(err) {
                console.log(err);
            } finally {
                // this.isPostsLoading = false;
                commit('setLoading', false);
            }
          },
    
          async loadMorePosts({state, commit}) {
            try {
                // this.page++;
                commit('setPage', state.page + 1);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts',
                        {   
                            params: {
                                _page: state.page,
                                _limit: state.limit
                            }
                        });
          
                // this.posts = [...this.posts, ...response.data];
                commit('setPosts', [...state.posts, ...response.data])
      
            } catch(err) {
                console.log(err);
            }
          }
    
    },

    namespaced: true

}