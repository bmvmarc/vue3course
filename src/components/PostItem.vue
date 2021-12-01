<template lang="">
    <div class="post">
       
        <div>
            <div><strong>№ {{post.id}} </strong></div>
            <div><strong>Title: </strong> {{post.title}}</div>
            <div><strong>Body</strong> {{post.body}}</div>
        </div>
       
        <div class="post-btns">
            <my-button 
                class="post-btn"
                @click="deletePost">
                Delete
            </my-button>

            <my-button 
                class="post-btn"
                @click="$router.push(`/posts/${post.id}`)">
                Open
            </my-button>

        </div>
        
    </div>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            reqired: true
        }
    },

    methods: {
        deletePost() {
            this.$emit('remove', this.post);
        }
    }
}
</script>

<style lang="css">
    .post {
        padding: 15px;
        border: solid 2px teal;
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: rgb(194, 241, 99);
    }   

    .post-btns {
        display: flex;
    } 
    .post-btn {
        align-self: flex-end;
        margin-left: 5px;
    }
</style>