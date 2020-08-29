
import update from 'immutability-helper';

import {
    GET_ALL_RECEIVE,
    GET_ALL_REQUEST
} from 'actions/people';

const InitialState = {
    data: null,
    loading: false
};

export default function(state = InitialState, action) {
    switch (action.type) {
        case GET_ALL_REQUEST:
            return update(state, {
                loading: { $set: true }
            })
        case GET_ALL_RECEIVE:
            return update(state, {
                loading: { $set: true },
                data: { $set: action.payload }
            })
    }
 
    return state
}
