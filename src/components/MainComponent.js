import React from 'react';
import SettingsContainer from "../containers/SettingsContainer";
import ApplicationFlowContainer from "../containers/ApplicationFlowContainer";
import DeviceComponent from "./DeviceComponent";
import LineChart from "recharts/es6/chart/LineChart";
import XAxis from "recharts/es6/cartesian/XAxis";
import CartesianGrid from "recharts/es6/cartesian/CartesianGrid";
import Line from "recharts/es6/cartesian/Line";
import YAxis from "recharts/es6/cartesian/YAxis";
import {average, correlation, generateRandomNumbers} from "../helpers/generators";
import ScatterChart from "recharts/es6/chart/ScatterChart";
import Scatter from "recharts/es6/cartesian/Scatter";
import Tooltip from "react-bootstrap/Tooltip";
import BarChart from "recharts/es6/chart/BarChart";
import Legend from "recharts/es6/component/Legend";
import Bar from "recharts/es6/cartesian/Bar";

export default class MainComponent extends React.Component
{
    render()
    {
        let devices = [];
        for(let i = 1; i <= this.props.DEVICE_AMOUNT; i++)
        {
            devices.push(<DeviceComponent key={i} title={"Охранник " + i} isBusy={false}/>)
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

        let data = [];
        let dataCorrelation = [];

        let numbers = generateRandomNumbers(50);
        let correlationNumbers = correlation(numbers, numbers);
        console.log('average:', average(numbers));

        for(let i = 1; i < numbers.length; i++)
        {
            data.push({
                x: numbers[i],
                y: numbers[i - 1],
            });
        }

        for(let i = 1; i < correlationNumbers.length; i++)
        {
            dataCorrelation.push({
                x: numbers[i],
                y: numbers[i - 1],
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
                    <ScatterChart
                        width={500}
                        height={500}
                        margin={{
                            top: 20, right: 20, bottom: 20, left: 20,
                        }}
                    >
                        <CartesianGrid />
                        <XAxis type="number" dataKey="x" name="stature" />
                        <YAxis type="number" dataKey="y" name="weight" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter name="A school" data={data} fill="#8884d8" />
                    </ScatterChart>
                </div>

                <div>
                    <LineChart width={500} height={300} data={dataCorrelation}>
                        <XAxis dataKey="x"/>
                        <YAxis/>
                        <CartesianGrid stroke="#eee" strokeDasharray="3 3"/>
                        <Line type="monotone" dataKey="y" stroke="#8884d8" />
                    </LineChart>
                </div>

                <div>
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="x" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="y" fill="#8884d8" />
                    </BarChart>
                </div>
            </div>
        );
    }
}