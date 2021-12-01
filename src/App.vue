<template>

    <div class="app">
        <h1>The post page</h1>

        <div class="app-btns">

            <my-button
                @click="dialogVisible = true"
                
            >
                Add a new post
            </my-button>   

            <my-input 
                style="margin: 0 15px"
                v-model="searchText" 
                placeholder="search">
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
        
 <!--       <div class="page-wrapper" v-show="!isPostsLoading">
            <div 
                v-for="pageNum in totalPages"
                :key="pageNum"
                :class="{
                    'page': pageNum != page,
                    'current-page': pageNum === page
                }"
                @click="changePage(pageNum)">
                {{ pageNum }}
            </div>
        </div>
-->

        <div 
            class="observer"
            ref="observer"
        >
        </div>

    </div>

</template>

<script>
import PostForm from './components/PostForm.vue';
import PostList from '@/components/PostList.vue';  // @ is an alias for 'src'
import MyButton from './components/UI/MyButton.vue';
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
      },

    //   changePage(pageNumber) {
    //       this.page = pageNumber;          
    //   }
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
    watch: {
        // page(newValue) {
        //     this.fetchPosts();
        // }
    },
    mounted() {
        this.fetchPosts();

        const options = {
            // root: document.querySelector('#scrollArea'),
            rootMargin: '0px',
            threshold: 1.0
        }
        const callback = (entries, observer) => {
            if (entries[0].isIntersecting && this.page < this.totalPages) {
                this.loadMorePosts()
            }
        }

        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer);

    },
}

</script>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .app {
        padding: 20px;
    }

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