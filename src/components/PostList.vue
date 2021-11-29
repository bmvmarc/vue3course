<template lang="">

    <div>
        
        <h3>Posts</h3>
        <post-item 
            v-for="post in posts"
            :post="post"
        />

    </div>  

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
    

</style>