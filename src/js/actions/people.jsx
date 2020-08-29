

export const GET_ALL_RECEIVE = 'GET_ALL_RECEIVE';
export const CHAR_FREQUENCY_RECEIVE = 'CHAR_FREQUENCY_RECEIVE';
export const EMAIL_DUPLICATES_RECEIVE =  'EMAIL_DUPLICATES_RECEIVE';

export const  getAll = () => {
    return async (dispatch) => {
        const endPoint = `api/people`;
        const response = await fetch(endPoint);
        const body = await response.json();

        dispatch({ type: GET_ALL_RECEIVE, payload: body });
    }
}

export const getCharFrequency = () => {
    return async (dispatch) => {
        const endPoint = `api/people/char_frequency`;
        const response = await fetch(endPoint);
        const body = await response.json();

        dispatch({ type: CHAR_FREQUENCY_RECEIVE, payload: body });
    }
}

export const getEmailDuplicates = () => {
    return async (dispatch) => {
        const endPoint = `api/people/email_duplicates`;
        const response = await fetch(endPoint);
        const body = await response.json();

        dispatch({ type: EMAIL_DUPLICATES_RECEIVE, payload: body });
    }
}


