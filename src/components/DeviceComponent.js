import React from 'react';
import Table from "react-bootstrap/Table";

export default class DeviceComponent extends React.Component
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

        for(let i = 0; i < this.props.STORAGE_CAPACITY; i++)
        {
            tdsIndex.push(<td>{i+1}</td>);
            if(i < amountOfNumbers)
            {
                tds.push(<td>-</td>);
            }
            else
            {
                tds.push(<td>{Math.floor(Math.random() * this.props.MAX_PRIORITY) + 1}</td>);
            }
        }

        return (
            <Table size={"lg"} striped={true} style={styles} responsive={"md"} striped bordered hover>
                <thead>
                    <tr>
                        <th>Индекс</th>
                        {tdsIndex}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Приоритет</th>
                        {tds}
                    </tr>
                </tbody>
            </Table>
        );
    }
}