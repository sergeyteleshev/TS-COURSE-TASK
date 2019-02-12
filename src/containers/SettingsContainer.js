import {connect} from 'react-redux';
import {settingsHandleChange, testAction} from "../actions/index";
import SettingsComponent from "../components/SettingsComponent";

const mapStateToProps = (state) => {
    return {
        MAX_PRIORITY: state.Main.MAX_PRIORITY,
        DEVICE_AMOUNT: state.Main.DEVICE_AMOUNT,
        STORAGE_CAPACITY: state.Main.STORAGE_CAPACITY,
        AV_TIME_CLAIMS_RECEIPT: state.Main.AV_TIME_CLAIMS_RECEIPT,
        AV_TIME_CLAIMS_PROCESSING: state.Main.AV_TIME_CLAIMS_PROCESSING,
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        handleChange: (propertyName, event) => dispatch(settingsHandleChange(propertyName, event))
    }
};

const SettingsContainer = connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);

export default SettingsContainer;