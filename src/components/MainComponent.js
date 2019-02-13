import React from 'react';
import SettingsContainer from "../containers/SettingsContainer";
import ApplicationFlowContainer from "../containers/ApplicationFlowContainer";
import DeviceComponent from "./DeviceComponent";
import LineChart from "recharts/es6/chart/LineChart";
import XAxis from "recharts/es6/cartesian/XAxis";
import CartesianGrid from "recharts/es6/cartesian/CartesianGrid";
import Line from "recharts/es6/cartesian/Line";
import YAxis from "recharts/es6/cartesian/YAxis";
import {generateRandomNumbers} from "../helpers/generators";

export default class MainComponent extends React.Component
{
    render()
    {
        let devices = [];
        for(let i = 1; i <= this.props.DEVICE_AMOUNT; i++)
        {
            devices.push(<DeviceComponent title={"Охранник " + i} isBusy={false}/>)
        }

        const style = {
            container: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: 'center',
                margin: '40px auto',
                width: '1000'
            },
            settings: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flexStart',
                alignItems: 'flex-start',
            },
            devices: {
                margin: '40px auto',
                display: 'flex',
                justifyContent: 'space-between',
                verticalAlign: 'center',
                width: '100%',
                flexWrap: 'wrap',
            }
        };

        let data = [
            {name: 0, uv: 400, pv: 1000, amt: 1000},
        ];

        let numbers = generateRandomNumbers(100);
        for(let i = 1; i < numbers.length; i++)
        {
            data.push({
                name: Math.floor(Math.random() * 1000),
                uv: Math.floor(Math.random() * 1000),
                pv: 1000,
                amt: 1000,
            });
        }

        return (
            <div style={style.container}>
                <div style={style.settings}>
                    <SettingsContainer/>
                </div>
                <div>
                    <h4>Поток заявок</h4>
                    <ApplicationFlowContainer/>
                </div>
                <div style={style.devices}>
                    {
                        devices.map(
                            (
                                device => {
                                    return device
                                }
                            )
                        )
                    }
                </div>
                <div>
                    <LineChart width={500} height={300} data={data}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                    </LineChart>
                </div>
            </div>
        );
    }
}