import {ADD_PERSONAL, ADD_QUALIFICATION, ADD_SKILL, ADD_PROJECT, ADD_SOCIALMEDIA,
    UPDATE_PERSONAL} from '../action/action.types';

const initialState = []

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PERSONAL:
            return [...state, action.payload]
        case ADD_QUALIFICATION:
            return [...state, action.payload]
        case ADD_SKILL:
            return [...state, action.payload]
        case ADD_PROJECT:
            return [...state, action.payload]
        case ADD_SOCIALMEDIA:
            return [...state, action.payload]
        default:
            return state
    }
}