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
                backgroundColor: '#F25252',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            },
            titleBusy: {
                color: 'white',
            },
            roundFree: {
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: '#14A697',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            },
            titleFree: {
                color: 'white',
            },
        };

        return (
            <div style={this.props.isBusy ? style.roundBusy : style.roundFree}>
                <span style={this.props.isBusy ? style.titleBusy: style.titleFree}>{this.props.title ? this.props.title : "Охранник 1"}</span>
            </div>
        );
    }
}

DeviceComponent.propTypes = {
    title: PropTypes.string,
    isBusy: PropTypes.bool,
};