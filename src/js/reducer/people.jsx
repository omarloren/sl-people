
import update from 'immutability-helper';

import {
    GET_ALL_REQUEST,
    GET_ALL_RECEIVE,
    CHAR_FREQUENCY_REQUEST,
    CHAR_FREQUENCY_RECEIVE
} from 'actions/people';

const InitialState = {
    data: null,
    frequencies: null,
    dulicates: null,
    loading: false
};

export default function(state = InitialState, action) {
    switch (action.type) {
        case GET_ALL_REQUEST:
        case CHAR_FREQUENCY_REQUEST:
            return update(state, {
                loading: { $set: true }
            })
        case GET_ALL_RECEIVE:
            return update(state, {
                loading: { $set: false },
                data: { $set: action.payload }
            })
        case CHAR_FREQUENCY_RECEIVE:
            return update(state, {
                loading: { $set: false },
                frequencies: { $set: action.payload }
            })
    }
 
    return state
}
