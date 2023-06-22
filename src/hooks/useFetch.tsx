import { useReducer, useCallback } from 'react';
import { meetupsReducer, State } from '.././reducers/meetups-reducers';
import axios from 'axios';

const initialState: State = {
    isLoading: false,
    data: [],
    error: ''
}

const useFetchEvents = (url: string) => {
    console.log('fetching events');
    const [events, dispatch] = useReducer(meetupsReducer, initialState);

    const fetchEvents = async () => {
        dispatch({
            type: 'FETCH_MEETUPS_LOADING',
            payload: []
        })

        const { data } = await axios.get(url);

        dispatch({
            type: 'FETCH_MEETUPS_SUCCESS',
            payload: data.data
        })
    }
    console.log(events, 'events from useFetchEvents hook');

    return {
        events,
        fetchEvents
    }
}

export default useFetchEvents;
