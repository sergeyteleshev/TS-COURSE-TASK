import React from 'react';
import PropTypes from 'prop-types';

export default class DeviceComponent extends React.Component
{
    render()
    {
        const style = {
            roundBusy: {
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: 'red',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            },
            titleBusy: {
                color: 'white',
            }
        };

        return (
            <div style={style.roundBusy}>
                <p style={style.titleBusy}>{this.props.title ? this.props.title : "Охранник 1"}</p>
            </div>
        );
    }
}

DeviceComponent.propTypes = {
    title: PropTypes.string,
    isBusy: PropTypes.bool,
};