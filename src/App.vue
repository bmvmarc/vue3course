<template>

    <div class="app">
        
        <post-form
          @create="createPost"/>
        <post-list 
          :posts="posts"
          @remove="removePost"/>
        
    </div>

</template>

<script>
import PostForm from './components/PostForm.vue';
import PostList from '@/components/PostList.vue';  // @ is an alias for 'src'

export default {

    components: {
        PostList,
        PostForm
    },

    data() {
        return {
            posts: [{id: '1', title: 'JS 1', body: 'Body 1'}, 
                    {id: '2', title: 'JS 2', body: 'Body 2'}, 
                    {id: '3', title: 'JS 3', body: 'Body 3'}, 
                    {id: '4', title: 'JS 4', body: 'Body 4'}]
        }
    },

    methods: {
      createPost(f, s, t) {
        this.posts.push(f);
      },
      removePost(post) {
          this.posts = this.posts.filter(i => i.id != post.id);
      }
    }
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