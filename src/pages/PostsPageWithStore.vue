<template>

    <div>

        <h1>The posts page with store</h1>
        <h2> {{ $store.getters.doubleLikes }} </h2>

        <h2> {{ $store.state.isAuth ? 'Username' : 'Please, log in to the system' }} </h2>

        <div>
            <my-button @click="$store.commit('incrementLikes')">Like</my-button>
            <my-button @click="$store.commit('decrementLikes')">Dislike</my-button>
        </div>


        <div class="app-btns">

            <my-button
                @click="dialogVisible = true"
                
            >
                Add a new post
            </my-button>   

            <my-input 
                v-focus
                style="margin: 0 15px"
                v-model="searchText" 
                placeholder="Search...">
            </my-input>

            <my-select
                v-model="selectedSort"
                :options="sortOptions"/>

        </div>

        <my-button 
            @click="fetchPosts">
            Load posts
        </my-button>


        <my-dialog v-model:show="dialogVisible">
            Add a post
            <post-form
            @create="createPost"
            />
        </my-dialog>


        <post-list 
          v-show="!isPostsLoading"
          :posts="readyPosts"
          @remove="removePost"
        />
        <div v-show="isPostsLoading">Posts loading...</div>

        <div 
            v-intersection="loadMorePosts"
            class="observer"
        >
        </div>

    </div>

</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';  // @ is an alias for 'src'
import MyButton from '@/components/UI/MyButton.vue';
import axios from 'axios';

export default {

    components: {
        PostList,
        PostForm,
        MyButton
    },

    data() {
        return {
            posts: [],
            dialogVisible: false,
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
        }
    },

    methods: {
      createPost(f, s, t) {
        this.posts.push(f);
        this.dialogVisible = false;
      },
      removePost(post) {
          this.posts = this.posts.filter(i => i.id != post.id);
      },

      async fetchPosts() {
        try {
            this.isPostsLoading = true;
            
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts',
                    {   
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }
                    });
            
            this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);

            this.posts = response.data;
  
        } catch(err) {
            alert(err);
        } finally {
            this.isPostsLoading = false;
        }
      },

      async loadMorePosts() {
        try {
            this.page++;
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts',
                    {   
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }
                    });
            
            // this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);

            this.posts = [...this.posts, ...response.data];
  
        } catch(err) {
            alert(err);
        }
      }

    },
        
    computed: {
        readyPosts() {
            const strSearch = this.searchText.toLowerCase();
            return [...this.posts]
                .filter(i => i.title.toLowerCase().includes(strSearch) 
                                ||  i.body.toLowerCase().includes(strSearch) )
                .sort( (a, b) => a[this.selectedSort]?.localeCompare(b[this.selectedSort]) );
        },

    },

    mounted() {
        this.fetchPosts();
    },
}

</script>

<style>
    .app-btns {
       display: flex;
       justify-content: space-between;
       margin: 15px 0;
    }

    .page-wrapper {
        display: flex;
        margin-top: 15px;
    }
    .page {
        border: 1px solid black;
        padding: 10px;
        margin: 2px;
        background: rgb(150,150,100);
    }

    .page:hover {
        background: rgba(150,250,100, 0.6); 
    }

    .current-page {
        border: 2px solid green;
        padding: 10px;
        margin: 2px;
        background: rgb(150,250,100);        
    }

    .observer {
        height: 30px;
        background: green;
    }

</style>