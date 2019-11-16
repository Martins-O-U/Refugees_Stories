import * as types from '../types';


const initialUserStoriesStatus = null;
export const userStoriesStatusReducer = (state = initialUserStoriesStatus, actions) => {
    switch(actions.type) {
        case types.GET_USER_STORIES_SUCCESS:
            return true;
        case types.GET_USER_STORIES_FAILED:
            return false;
        default:
            return state
    }
}

const initialPendingStoriesStatus = null;
export const pendingStoriesStatusReducer = (state = initialPendingStoriesStatus, actions) => {
    switch(actions.type) {
        case types.GET_PENDING_STORIES_SUCCESS:
            return true;
        case types.GET_PENDING_STORIES_FAILED:
            return false;
        default:
            return state
    }
}

const initialaddStoryStatus = null;
export const addStoryStatusReducer = (state = initialaddStoryStatus, actions) => {
    switch(actions.type) {
        case types.SUBMIT_STORY_SUCCESS:
            return true;
        case types.SUBMIT_STORY_FAILED:
            return false;
        default:
            return state
    }
}

const initialVolunteerPlacesStatus = null;
export const volunteerPlacesStatusReducer = (state = initialVolunteerPlacesStatus, actions) => {
    switch(actions.type) {
        case types.GET_VOLUNTEER_PLACES_SUCCESS:
            return true;
        case types.GET_VOLUNTEER_PLACES_FAILED:
            return false;
        default:
            return state
    }
}