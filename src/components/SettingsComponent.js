import React from 'react';
import {STORAGE_CAPACITY} from "../consts/initialConsts";
import Table from "react-bootstrap/Table";

export default class SettingsComponent extends React.Component
{
    render()
    {
        const styles= {
            textAlign: 'center',
            width: '1100',
            verticalAlign: 'center',
        };

        return (
            <Table size={"lg"} style={styles} striped={true} responsive={"md"} striped bordered hover>
                <thead>
                <tr>
                    <td><label>Максимальный приоритет:</label></td>
                    <td><label>Время ожидания:</label></td>
                    <td><label>Время обработки:</label></td>
                    <td><label>Количество устройств:</label></td>
                    <td><label>Ёмкость батареи:</label></td>
                    <td><label>N</label></td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><input onChange={(event) => this.props.handleChange('MAX_PRIORITY', event)} value={this.props.MAX_PRIORITY} type={"number"}/></td>
                    <td><input onChange={(event) => this.props.handleChange('AV_TIME_CLAIMS_RECEIPT', event)} value={this.props.AV_TIME_CLAIMS_RECEIPT} type={"number"}/></td>
                    <td><input onChange={(event) => this.props.handleChange('AV_TIME_CLAIMS_PROCESSING', event)} value={this.props.AV_TIME_CLAIMS_PROCESSING} type={"number"}/></td>
                    <td><input onChange={(event) => this.props.handleChange('DEVICE_AMOUNT', event)} value={this.props.DEVICE_AMOUNT} type={"number"}/></td>
                    <td><input onChange={(event) => this.props.handleChange('STORAGE_CAPACITY', event)} value={this.props.STORAGE_CAPACITY} type={"number"}/></td>
                    <td><input onChange={(event) => this.props.handleChange('N', event)} value={this.props.N} type={"number"}/></td>
                </tr>
                </tbody>
            </Table>
        );
    }
}