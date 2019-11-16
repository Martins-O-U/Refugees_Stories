import * as types from '../types';


const initialUserStories = [];
export const userStoriesReducer = (state = initialUserStories, actions) => {
    switch(actions.type) {
        case types.GET_USER_STORIES:
            return actions.payload;
        case types.DELETE_STORY:
            return state;
        default:
            return state
    }
}

const initialPendingStories = [];
export const pendingStoriesReducer = (state = initialPendingStories, actions) => {
    switch(actions.type) {
        case types.GET_PENDING_STORIES:
            return actions.payload;
        case types.SUBMIT_STORY:
            return state;
        case types.APPROVE_STORY:
        case types.REJECT_STORY:
            return state;
        default:
            return state
    }
}