import { SET_RECENT_POSTS } from '../actions/types'
import recentsPosts from '../components/recentsPosts';


const INIT_STATE = {
    post:[],
    recentPost :[]
}

export default function(state = INIT_STATE, action){
    switch (action.type) {
        case SET_RECENT_POSTS:
            return[...state, recentsPosts: action.payload]
            break;
    
        default:
            break;
    }

}