import React from 'react';
import SettingsContainer from "../containers/SettingsContainer";
import ApplicationFlowContainer from "../containers/ApplicationFlowContainer";
import DeviceComponent from "./DeviceComponent";

export default class MainComponent extends React.Component
{
    render()
    {
        let devices = [];
        for(let i = 1; i <= this.props.DEVICE_AMOUNT; i++)
        {
            devices.push(<DeviceComponent title={"Охранник " + i} isBusy={true}/>)
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
            </div>
        );
    }
}