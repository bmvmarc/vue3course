<template>

    <div>
        <h1>The posts page - composition API</h1>
        <h2> {{ likes }} </h2>
        <button @click="addLike"> Like </button>

          <div class="app-btns">

            <my-button>
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

         <my-dialog v-model:show="dialogVisible">
                Add a post
                <post-form
                    @create="createPost"/>
        </my-dialog>

        <post-list 
          v-show="!isPostsLoading"
          :posts="readyPosts"/>
        
        <div v-show="isPostsLoading">Posts loading...</div>
  
    </div>

</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';  
import MyButton from '@/components/UI/MyButton.vue';
import axios from 'axios';
import { ref } from 'vue';

import usePosts from '../hooks/usePosts.js';
import useReadyPosts from '../hooks/useReadyPosts.js';

export default {

    components: {
        PostList,
        PostForm,
        MyButton
    },

    data() {
        return {
            dialogVisible: false,     
            sortOptions: [
                {value: 'title', name: 'By title'},
                {value: 'body', name: 'By body'}
            ]
        }
    },

    setup(props) {
        const {posts, totalPages, isPostsLoading} = usePosts(10);
        const {readyPosts, selectedSort, searchText} = useReadyPosts(posts);


        return {
            posts,
            totalPages,
            isPostsLoading,
            readyPosts,
            selectedSort,
            searchText
        }
    }    
    
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