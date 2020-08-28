
import update from 'immutability-helper';

import {
    
} from 'actions/people';

const InitialState = {
    data: null,
    loading: false
};

export default function(state = InitialState, action) {
    console.log(action)
    return state
}
