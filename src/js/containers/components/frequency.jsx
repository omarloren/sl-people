import React, { useEffect }from 'react';
import css from 'css/Page';
import moment from 'moment'
import { connect, useDispatch } from 'react-redux';

import { Button, Header, Modal, Table } from 'semantic-ui-react'
import { getCharFrequency } from 'actions/people'

let frequenciesTable = (frequencies) => {
    let rows = []
    for (let char in frequencies) {
        rows.push(
            <Table.Row>
                <Table.Cell>{char}</Table.Cell>
                <Table.Cell>{frequencies[char]}</Table.Cell>
            </Table.Row>
        )
    }

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Char</Table.HeaderCell>
                    <Table.HeaderCell>Frequency</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {rows}
            </Table.Body>
        </Table>
    )
}

function Frequency(props) {
    const { frequencies, open, onClose } = props;
    if (!open) {
        return null
    }

    const dispatch = useDispatch();
    
    useEffect(() => {
        if (frequencies === null) {
            dispatch(getCharFrequency())
        }
    })

    

    return (
        <Modal
            size='small'
            open
        >
            <Header>
                Char Frequency Breakdown
            </Header>
            <Modal.Content>
                {
                    frequencies ? (
                        frequenciesTable(frequencies)
                    ) : null
                }
            </Modal.Content>
            <Modal.Actions>
                <Button size='tiny' primary onClick={onClose}>
                    Close
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default connect((state) => state)(Frequency)