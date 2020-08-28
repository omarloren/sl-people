import React, { useEffect }from 'react';
import css from 'css/Page';
import moment from 'moment'
import { connect, useDispatch } from 'react-redux';

import { Grid, Header, Icon, Search, Segment, Image, Dimmer, Loader } from 'semantic-ui-react'
import { getAll } from 'actions/people'

function People(props) {
    const { data } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        if (data === null ) {
            dispatch(getAll())
        }
    }, [data])

    return (
        <h1>HOLA</h1>
    )
}

export default connect((state) => state)(People);
