
export const GET_ALL_REQUEST = 'GET_ALL_REQUEST';
export const GET_ALL_RECEIVE = 'GET_ALL_RECEIVE';

export const  getAll = () => {
    return async (dispatch) => {
        const endPoint = `api/people`;

        dispatch({ type: GET_ALL_REQUEST });

        const response = await fetch(endPoint);
        const body = await response.json();

        dispatch({ type: GET_ALL_RECEIVE, payload: body });
    }
}


