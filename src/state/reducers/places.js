import * as types from '../types';


const initialVolunteerPlaces = {};
export const volunteerPlacesReducer = (state = initialVolunteerPlaces, actions) => {
    switch(actions.type) {
        case types.GET_VOLUNTEER_PLACES:
            return actions.payload;
        default:
            return state
    }
}