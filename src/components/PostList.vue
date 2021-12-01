<template lang="">

    <div v-if="posts.length > 0">   
        <h3>Posts</h3>
        <transition-group name="posts-list">
            <post-item 
                v-for="post in posts"
                :post="post"
                :key="post.id"
                @remove="$emit('remove', post)"
            />
        </transition-group>
    </div>  

    <h2 v-else style="color: red;">
        There are no posts yet
    </h2>

</template>

<script>
import PostItem from './PostItem.vue';

export default {

    components: {
        PostItem
    },

    props: {
        posts: {
            type: Array,
            reqired: true
        }

    }
}

</script>

<style scoped lang="css">

.posts-list-item {
  display: inline-block;
  margin-right: 10px;
}
.posts-list-enter-active,
.posts-list-leave-active {
  transition: all 0.4s ease;
}
.posts-list-enter-from,
.posts-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}  

.posts-list-move {
  transition: transform 0.4s ease;
}

</style>