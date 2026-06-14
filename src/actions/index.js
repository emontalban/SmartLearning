import { SET_RECENT_POSTS } from './types'

import axios from "axios";




export function fetchRecentPosts() {
    return function(dispatch)  {
        axios.get(`https://dummyjson.com/posts`)
            .then(response =>{
                console.log(response.data);
                dispatch({ 
                    type: 'SET_RECENT_POSTS', 
                    payload: response.data.posts 
                });
            })
            
    }
  
};
