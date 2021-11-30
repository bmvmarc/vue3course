<template>

    <div class="app">
        <h1>The post page</h1>

        <my-button 
            @click="fetchPosts">
            Load posts
        </my-button>

        <my-button
            @click="dialogVisible = true"
            style="margin: 15px 0"
        >
            Add a new post
        </my-button>

        <my-dialog v-model:show="dialogVisible">
            Add a post
            <post-form
            @create="createPost"
            />
        </my-dialog>


        <post-list 
          v-show="!isPostsLoading"
          :posts="posts"
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
            isPostsLoading: false
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
</style>