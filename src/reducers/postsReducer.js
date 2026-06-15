import { SET_RECENT_POSTS, SET_RESULTS_POSTS, SET_SELECTED_POST } from '../actions/types'


const INIT_STATE = {
    resultsPosts: [],
    recentPosts: [],
    selectedPost: null
}

export default function(state = INIT_STATE, action){
    switch (action.type) {
        case SET_RECENT_POSTS:
            const  recentPosts = action.payload
            return {
                    ...state, 
                    recentPosts
                }

        case SET_RESULTS_POSTS:
                const resultsPosts = action.payload;
                return {
                    ...state, 
                    resultsPosts
                }
        case SET_SELECTED_POST:
                const selectedPost = action.payload;
                return {
                    ...state,
                    selectedPost
                }
    
        default:
            return state;
    }

}