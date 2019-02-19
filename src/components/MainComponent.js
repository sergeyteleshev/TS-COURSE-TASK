import React from 'react';
import SettingsContainer from "../containers/SettingsContainer";
import ApplicationFlowContainer from "../containers/ApplicationFlowContainer";
import DeviceComponent from "./DeviceComponent";
import LineChart from "recharts/es6/chart/LineChart";
import XAxis from "recharts/es6/cartesian/XAxis";
import CartesianGrid from "recharts/es6/cartesian/CartesianGrid";
import Line from "recharts/es6/cartesian/Line";
import YAxis from "recharts/es6/cartesian/YAxis";
import {
    average,
    correlation,
    criteriaStatistics,
    dispersion,
    generateRandomNumbers,
    trustInterval,
    t, histogramCheck
} from "../helpers/generators";
import ScatterChart from "recharts/es6/chart/ScatterChart";
import Scatter from "recharts/es6/cartesian/Scatter";
import Tooltip from "react-bootstrap/Tooltip";
import BarChart from "recharts/es6/chart/BarChart";
import Bar from "recharts/es6/cartesian/Bar";

export default class MainComponent extends React.Component
{
    render()
    {
        const correlationNumber = 20;

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
            },
            comparison: {
                display: 'inline-flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            },
            comparisonItem: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }
        };

        let dataTimeClaimsReceipt = [];
        let dataCorrelationTimeClaimsReceipt = [];
        let dataTimeClaimsProcessing = [];
        let dataCorrelationTimeClaimsProcessing = [];
        let dataHistogramTimeClaimsReceipt = [];
        let dataHistogramTimeClaimsProcessing = [];
        let arr = new Array(20);

        let numbersTimeClaimsReceipt = generateRandomNumbers(this.props.N, this.props.AV_TIME_CLAIMS_RECEIPT);
        let numbersTimeClaimsProcessing = generateRandomNumbers(this.props.N, this.props.AV_TIME_CLAIMS_PROCESSING);
        let histogramTimeClaimsNumbers = histogramCheck(numbersTimeClaimsReceipt);
        let histogramTimeClaimsProcessingNumbers = histogramCheck(numbersTimeClaimsProcessing);

        let correlationNumbersTimeClaimsReceipt = correlation(numbersTimeClaimsReceipt, arr);
        let correlationNumbersTimeClaimsProcessing = correlation(numbersTimeClaimsProcessing, arr);

        let trustIntervalTimeClaimsReceipt = trustInterval(numbersTimeClaimsReceipt);
        let trustIntervalTimeClaimsProcessing = trustInterval(numbersTimeClaimsProcessing);

        for(let i = 1; i < numbersTimeClaimsReceipt.length; i++)
        {
            dataTimeClaimsReceipt.push({
                x: numbersTimeClaimsReceipt[i],
                y: numbersTimeClaimsReceipt[i - 1],
            });

            dataTimeClaimsProcessing.push({
                x: numbersTimeClaimsProcessing[i],
                y: numbersTimeClaimsProcessing[i - 1],
            });
        }

        for(let i = 1; i < correlationNumber; i++)
        {
            dataCorrelationTimeClaimsReceipt.push({
                x: correlationNumbersTimeClaimsReceipt[i],
                y: correlationNumbersTimeClaimsReceipt[i - 1],
            });

            dataCorrelationTimeClaimsProcessing.push({
                x: correlationNumbersTimeClaimsProcessing[i],
                y: correlationNumbersTimeClaimsProcessing[i - 1],
            });
        }

        for(let i = 0; i < 10; i++)
        {
            dataHistogramTimeClaimsReceipt.push({
                x: i,
                y: histogramTimeClaimsNumbers[i],
            });

            dataHistogramTimeClaimsProcessing.push({
                x: i,
                y: histogramTimeClaimsProcessingNumbers[i],
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

                <div style={style.comparison}>
                    <div>
                        <div style={style.comparisonItem}>
                            <p>Мат Ожидание: {average(numbersTimeClaimsReceipt)}</p>
                            <p>Дисперсия: {dispersion(numbersTimeClaimsReceipt)}</p>
                            <p>Доверительный интервал:</p>
                            <p>[{trustIntervalTimeClaimsReceipt[0]}; {trustIntervalTimeClaimsReceipt[1]}]</p>
                            <p>Критерий статистики: {criteriaStatistics(numbersTimeClaimsReceipt)}</p>
                            <p>t = {t}</p>
                            <p>{criteriaStatistics(numbersTimeClaimsReceipt) >= t ? "Гипотеза принимается" : "Гипотеза не принимается"}</p>
                        </div>
                        <div style={style.comparisonItem}>
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
                                <Scatter name="A school" data={dataTimeClaimsReceipt} fill="#8884d8" />
                            </ScatterChart>
                        </div>
                        <div style={style.comparisonItem}>
                            <LineChart width={500} height={300} data={dataCorrelationTimeClaimsReceipt}>
                                <XAxis dataKey="x"/>
                                <YAxis/>
                                <CartesianGrid stroke="#eee" strokeDasharray="3 3"/>
                                <Line type="monotone" dataKey="y" stroke="#8884d8" />
                            </LineChart>
                        </div>
                        <div style={style.comparisonItem}>
                            <BarChart
                                width={500}
                                height={300}
                                data={dataHistogramTimeClaimsReceipt}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="x" />
                                <YAxis />
                                <Bar dataKey="y" fill="#8884d8" />
                            </BarChart>
                        </div>
                    </div>
                    <div>
                        <div style={style.comparisonItem}>
                            <p>Мат Ожидание: {average(numbersTimeClaimsProcessing)}</p>
                            <p>Дисперсия: {dispersion(numbersTimeClaimsProcessing)}</p>
                            <p>Доверительный интервал:</p>
                            <p>[{trustIntervalTimeClaimsProcessing[0]}; {trustIntervalTimeClaimsProcessing[1]}]</p>
                            <p>Критерий статистики: {criteriaStatistics(numbersTimeClaimsProcessing)}</p>
                            <p>t = {t}</p>
                            <p>{criteriaStatistics(numbersTimeClaimsProcessing) >= t ? "Гипотеза принимается" : "Гипотеза не принимается"}</p>

                        </div>
                        <div style={style.comparisonItem}>
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
                                <Scatter name="A school" data={dataTimeClaimsProcessing} fill="#880fff" />
                            </ScatterChart>
                        </div>
                        <div style={style.comparisonItem}>
                            <LineChart width={500} height={300} data={dataCorrelationTimeClaimsProcessing}>
                                <XAxis dataKey="x"/>
                                <YAxis/>
                                <CartesianGrid stroke="#eee" strokeDasharray="3 3"/>
                                <Line type="monotone" dataKey="y" stroke="#880fff" />
                            </LineChart>
                        </div>
                        <div style={style.comparisonItem}>
                            <BarChart
                                width={500}
                                height={300}
                                data={dataHistogramTimeClaimsProcessing}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="x" />
                                <YAxis />
                                <Bar dataKey="y" fill="#880fff" />
                            </BarChart>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}