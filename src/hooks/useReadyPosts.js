import { ref, computed } from 'vue';

export default function useReadyPosts(posts) {

    const selectedSort = ref('');
    const searchText = ref('');

    const readyPosts = computed(() => {

        const strSearch = searchText.value.toLowerCase();
        return [...posts.value]
            .filter(i => i.title.toLowerCase().includes(strSearch) 
                            ||  i.body.toLowerCase().includes(strSearch) )
            .sort( (a, b) => a[selectedSort.value]?.localeCompare(b[selectedSort.value]) );

    });

    return {
        selectedSort,
        searchText,
        readyPosts
    }

}