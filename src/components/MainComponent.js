import React from 'react';
import DeviceComponent from "./DeviceComponent";
import SettingsComponent from "./SettingsComponent";
import SettingsContainer from "../containers/SettingsContainer";
import DeviceContainer from "../containers/DeviceContainer";

export default class MainComponent extends React.Component
{
    render()
    {
        let devices = [];
        for(let i = 0; i < this.props.DEVICE_AMOUNT; i++)
             devices.push(<DeviceContainer/>);

        const style = {
            container: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: 'center',
                margin: '40px auto',
            },
            settings: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flexStart',
                alignItems: 'flex-start',
            }
        };

        return (
            <div style={style.container}>
                <div style={style.settings}>
                    <SettingsContainer/>
                </div>
                {devices.map((device, index) => {
                    return (
                        <div>
                            <h3>Устройство {index + 1}</h3>
                            {device}
                        </div>
                    )
                })}
            </div>
        );
    }
}