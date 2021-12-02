<template>

    <div>
<!--
        <h2> {{ $store.state.isAuth ? 'Username' : 'Please, log in to the system' }} </h2>

        <div>
            <my-button @click="$store.commit('incrementLikes')">Like</my-button>
            <my-button @click="$store.commit('decrementLikes')">Dislike</my-button>
        </div>
-->

        <h1>The posts page with store</h1>
        <div class="app-btns">

            <my-button
                @click="dialogVisible = true">
                    Add a new post
            </my-button>   

            <my-input 
                v-focus
                :model-value="searchText"
                @update:model-value="setSearchText" 
                placeholder="Search...">
            </my-input>

            <my-select
                :model-value="selectedSort"
                @update:model-value="setSelectedSort"
                :options="sortOptions"/>

        </div>

        <my-button 
            @click="fetchPosts">
                Load posts
        </my-button>

        <my-dialog v-model:show="dialogVisible">
                Add a post
            <post-form
            @create="createPost"/>
        </my-dialog>

        <post-list 
          v-show="!isPostsLoading"
          :posts="this.readyPosts"
          @remove="removePost" />

        <div v-show="isPostsLoading">Posts loading...</div>
        <div v-intersection="loadMorePosts" class="observer"></div>

    </div>

</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';  
import MyButton from '@/components/UI/MyButton.vue';

import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

export default {

    components: {
        PostList,
        PostForm,
        MyButton
    },

    data() {
        return {
            dialogVisible: false
        }
    },

    methods: {

        ...mapMutations({
            setPage: 'post/setPage',
            setSearchText: 'post/setSearchText',
            setSelectedSort: 'post/setSelectedSort'
        }),

        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts'
        }),

        createPost(f, s, t) {
            this.posts.push(f);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(i => i.id != post.id);
        },

    },
        
    computed: {
        ...mapState({
            posts:          state => state.post.posts,
            isPostsLoading: state => state.post.isPostsLoading,
            selectedSort:   state => state.post.selectedSort,
            searchText:     state => state.post.searchText,
            limit:          state => state.post.limit,
            page:           state => state.post.page,  
            totalPages:     state => state.post.totalPages,        
            sortOptions:    state => state.post.sortOptions
        }),
        ...mapGetters({
            readyPosts: 'post/readyPosts'
        })
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