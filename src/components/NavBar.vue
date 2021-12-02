<template>
    <div class="nav-bar">
        <div
            @click="$router.push('/')">
            Vue 3</div>
        <div class="nav-bar-btns">
        
            <my-button
                class="nav-bar-btn"
                @click="$router.push('/posts')">
                Posts
            </my-button>

            <my-button
                class="nav-bar-btn"
                @click="$router.push('/store')">
                Store
            </my-button>

            <my-button
                class="nav-bar-btn"
                @click="$router.push('/about')">
                About
            </my-button>

        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .nav-bar {
        height: 50px;
        background-color: lightgray;
        box-shadow: 2px 2px 4px gray;
        display: flex;
        align-items: center;
        padding: 0 15px;
    }
    .nav-bar-btns {
        margin-left: auto;
    }
    .nav-bar-btn {
        margin-left: 20px;
    }
</style>