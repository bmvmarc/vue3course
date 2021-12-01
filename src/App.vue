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
            posts: []
            ,
            dialogVisible: false,
            isPostsLoading: false,
            selectedSort: '',
            searchText: '',
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
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
            this.posts = response.data;
  
        } catch(err) {
            alert(err);
        } finally {
            this.isPostsLoading = false;
        }
      },
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
    // watch: {
    //     selectedSort(newValue) {
    //         this.posts.sort((a, b) => {
    //             return a[newValue]?.localeCompare(b[newValue])
    //         });
    //     }
    // },

    mounted() {
        this.fetchPosts();
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

</style>