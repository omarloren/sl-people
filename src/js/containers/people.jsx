import React, { useEffect, useState }from 'react';
import css from 'css/Page';
import moment from 'moment'
import { connect, useDispatch } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';

import { getAll } from 'actions/people';

import Frequency from 'containers/components/frequency';
import Duplicates from 'containers/components/duplicates';


function People(props) {
    const { data } = props;
    const dispatch = useDispatch();
    
    const [showFrequency, setShowFrequency] = useState(false)
    const [showDuplicates, setShowDuplicates] = useState(false)

    useEffect(() => {
        if (data === null ) {
            dispatch(getAll())
        }
    }, [data])


    if (data === null) {
        return null;
    }

    return (
        <div className={css.container}>
            <h3>People</h3>
            <div className={css.actions}>
                <Button size='tiny' primary onClick={() => setShowFrequency(true)}>Char Frequency</Button>
                <Button size='tiny' primary onClick={() => setShowDuplicates(true)}>Email Duplicates</Button>
            </div>

            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Job Title</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                {
                    data.map((person) => (
                        <Table.Row key={person.id}>
                            <Table.Cell>{person.display_name}</Table.Cell>
                            <Table.Cell>{person.email_address}</Table.Cell>
                            <Table.Cell>{person.title}</Table.Cell>
                        </Table.Row> 
                    ))
                }
                </Table.Body>
            </Table>
            <Frequency open={showFrequency} onClose={() => setShowFrequency(false) } />
            <Duplicates open={showDuplicates} onClose={() => setShowDuplicates(false) } />
        </div>
    )
}

export default connect((state) => state)(People);
