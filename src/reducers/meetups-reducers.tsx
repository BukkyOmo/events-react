import { Reducer } from "react"

export interface State {
    isLoading: boolean,
    data: [],
    error: string | null
}

interface Action {
    type: string
    payload: []
}

export const meetupsReducer: Reducer<State, Action> = (state: State, action: Action): State => {
    switch (action.type) {
        case 'FETCH_MEETUPS_LOADING':
            return {
                ...state,
                isLoading: true,
                data: [],
                error: ''
            }
        case 'FETCH_MEETUPS_SUCCESS':
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                error: ''
            }
        case 'FETCH_MEETUPS_ERROR':
            return {
                ...state,
                isLoading: false,
                data: [],
                // error: action.payload 
            }
        default:
            return state;
    }
}
