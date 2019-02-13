import React from 'react';
import Table from "react-bootstrap/Table";
import {generateRandomNumbers} from "../helpers/generators";

export default class ApplicationFlowComponent extends React.Component
{
    render()
    {
        const styles= {
            textAlign: 'center',
            width: '1100',
        };

        let tds = [];
        let tdsIndex = [];
        const amountOfNumbers = Math.floor(Math.random() * this.props.STORAGE_CAPACITY + 1);
        const randomNumbers = generateRandomNumbers(this.props.STORAGE_CAPACITY);
        console.log(randomNumbers);

        for(let i = 0; i < this.props.STORAGE_CAPACITY; i++)
        {
            tdsIndex.push(<td>{i+1}</td>);
            if(i < amountOfNumbers)
            {
                tds.push(<td>-</td>);
            }
            else
            {
                //tds.push(<td>{Math.floor(Math.random() * this.props.MAX_PRIORITY) + 1}</td>);
                tds.push(<td>{randomNumbers[i].toFixed(2)}</td>);
            }
        }

        return (
            <Table size={"sm"} striped={true} style={styles} responsive={"md"} striped bordered hover>
                <thead>
                    <tr>
                        <th>№</th>
                        {tdsIndex}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>X</th>
                        {tds}
                    </tr>
                </tbody>
            </Table>
        );
    }
}