<template lang="">

    <form @submit.prevent>
        <my-input 
            v-model="post.title" 
            placeholder="Title">
        </my-input>
        <my-input 
            v-model="post.body" 
            placeholder="Body">
        </my-input>
        <my-button 
            style="align-self: flex-end; margin-top: 15px;"
            @click="createPost">
            Add post
        </my-button>
    </form>

</template>

<script>
export default {
    data() {
        return {
            post: {
                title: '',
                body: ''
            }
        }
    },
    methods: {
        createPost() {
            this.post.id = Date.now();
            this.$emit('create', this.post, 'second param', 'third param');
            this.post = {
                title: '',
                body: ''              
            }
        }
    }
}
</script>

<style scoped lang="css">
    form {
        display: flex;
        flex-flow: column;
    }
   
</style>