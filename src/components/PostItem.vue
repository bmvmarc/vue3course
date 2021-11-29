<template lang="">
    <div class="post">
        <div>
            <div><strong>Title: </strong> {{post.title}}</div>
            <div><strong>Body</strong> {{post.body}}</div>
        </div>
        <div class="post_btns">
            <my-button 
                style="align-self: flex-end;"
                @click="deletePost">
                Delete
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
            this.$emit('delete', props.post.id);
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
    }    
</style>