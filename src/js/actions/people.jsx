
export const GET_ALL_REQUEST = 'GET_ALL_REQUEST';
export const GET_ALL_RECEIVE = 'GET_ALL_RECEIVE';
export const CHAR_FREQUENCY_REQUEST = 'CHAR_FREQUENCY_REQUEST';
export const CHAR_FREQUENCY_RECEIVE = 'CHAR_FREQUENCY_RECEIVE';

export const  getAll = () => {
    return async (dispatch) => {
        const endPoint = `api/people`;

        dispatch({ type: GET_ALL_REQUEST });

        const response = await fetch(endPoint);
        const body = await response.json();

        dispatch({ type: GET_ALL_RECEIVE, payload: body });
    }
}

export const getCharFrequency = () => {
    return async (dispatch) => {
        const endPoint = `api/people/char_frequency`;

        dispatch({ type: CHAR_FREQUENCY_REQUEST });

        const response = await fetch(endPoint);
        const body = await response.json();

        dispatch({ type: CHAR_FREQUENCY_RECEIVE, payload: body });
    }
}


