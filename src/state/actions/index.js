import axios from 'axios';
import * as types from '../types';
import withAuth from '../../utils/axios';


axios.defaults.baseURL = 'https://bwrefugeestories.herokuapp.com/';

export const getUserStories = () => dispatch => {
    axios.get('/api/stories')
        .then(response => {
            dispatch({
                type: types.GET_USER_STORIES, 
                payload: response.data
            });
            dispatch({
                type: types.GET_USER_STORIES_SUCCESS, 
                payload: true
            })
        })
        .catch(error => {
            dispatch({
                type: types.GET_USER_STORIES_FAILED, 
                payload: false
            })
        })
}

export const getPendingStories = () => dispatch => {
    withAuth().get('/api/admin/stories')
        .then(response => {
            dispatch({
                type: types.GET_PENDING_STORIES, 
                payload: response.data
            });
        })
        .catch(error => console.log(error.message))
}


export const addStory = (story) => dispatch => {
    axios.post('/api/stories', story)
        .then(res => {
            dispatch({
                type: types.SUBMIT_STORY,
            });
            dispatch({
                type: types.SUBMIT_STORY_SUCCESS, 
                payload: true
            })
        })
        .catch(error => {
            dispatch({
                type: types.SUBMIT_STORY_FAILED, 
                payload: false
            })
        })
}
  
export const toggleAddStoryStatus = (bool) => {
    if(bool) {
        return {
            type: types.SUBMIT_STORY_SUCCESS, 
            payload: bool
        }
    } else {
        return {
            type: types.SUBMIT_STORY_FAILED, 
            payload: bool
        }
    }
}

export const approveStory = (id, story) => dispatch => {
    withAuth().post(`/api/admin/stories/approve/${id}`, story)
        .then(res => {
            dispatch({
                type: types.APPROVE_STORY
            });
        })
        .catch(error => console.log(error))
}

export const rejectStory = (id) => dispatch => {
    axios.delete(`/api/admin/stories/reject/${id}`)
        .then(res => {
            dispatch({
                type: types.REJECT_STORY
            });
        })
        .catch(error => console.log(error))
}

export const deleteStory = (id) => dispatch => {
    withAuth().delete(`/api/admin/stories/delete/${id}`)
        .then(res => {
            dispatch({
                type: types.DELETE_STORY
            });
        })
        .catch(error => console.log(error))
}
export const getVolunteerPlaces = () => dispatch => {
     
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            axios.get(`https://api.foursquare.com/v2/venues/search?ll=${position.coords.latitude},${position.coords.longitude}&client_id=${process.env.REACT_APP_FOURSQUARE_CLIENT_ID}&client_secret=${process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET}&v=20191024&query=hospitals,church,schools`)
                .then(response => {
                    dispatch({
                        type: types.GET_VOLUNTEER_PLACES, 
                        payload: response.data
                    });
                    dispatch({
                        type: types.GET_VOLUNTEER_PLACES_SUCCESS, 
                        payload: true
                    })
                })
                .catch(error => console.log(error.message))
        });
    } else {
        alert("Sorry, browser does not support geolocation!");
    }
    
}