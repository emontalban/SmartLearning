import { SET_RECENT_POSTS, SET_RESULTS_POSTS, SET_SELECTED_POST } from './types'

import axios from "axios";


export function fetchRecentPosts() {
    return function(dispatch)  {
        axios.get(`https://dummyjson.com/posts`)
            .then(response =>{
                dispatch({ 
                    type: 'SET_RECENT_POSTS', 
                    payload: response.data.posts 
                });
            })
            
    }
  
};

export function fetchPostsWithQuery(query, callback) {
    return function(dispatch) {
        axios.get(`https://dummyjson.com/posts/search?q=${query}`)
            .then(response => {
                dispatch({
                    type: SET_RESULTS_POSTS,
                    payload: response.data.posts
                })
                if(callback) { callback() }
            })
    }
}

export function fetchPost(postId) {
    return function(dispatch) {
        axios.get(`https://dummyjson.com/posts/${postId}`)
            .then(response => {
                dispatch({
                    type: SET_SELECTED_POST,
                    payload: response.data
                })
            })
    }
}