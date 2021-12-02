import { createWebHistory, createRouter } from 'vue-router';
import Main from '../pages/Main.vue';
import PostPage from '../pages/PostPage.vue';
import About from '@/pages/About.vue';
import PostIdPage from '@/pages/PostIdPage.vue';
import PostsPageWithStore from '@/pages/PostsPageWithStore.vue';
import PostsPageCompositionAPI from '@/pages/PostsPageCompositionAPI.vue'


const routes = [
    {
        path: '/',
        component: Main
    },

    {
        path: '/posts',
        component: PostPage
    },

    {
        path: '/about',
        component: About
    },

    {
        path: '/posts/:id',
        component: PostIdPage
    },
    
    {
        path: '/store',
        component: PostsPageWithStore
    },
    
    {
        path: '/composition',
        component: PostsPageCompositionAPI
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
});

export default router;