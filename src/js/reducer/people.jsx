
import update from 'immutability-helper';

import {
    GET_ALL_RECEIVE,
    CHAR_FREQUENCY_RECEIVE,
    EMAIL_DUPLICATES_RECEIVE
} from 'actions/people';

const InitialState = {
    data: null,
    frequencies: null,
    duplicates: null,
};

export default function(state = InitialState, action) {
    switch (action.type) {
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
        case EMAIL_DUPLICATES_RECEIVE:
            return update(state, {
                loading: { $set: false },
                duplicates: { $set: action.payload }
            })
    }
 
    return state
}
