import {connect} from 'react-redux';
import {testAction} from "../actions/index";
import DeviceComponent from "../components/DeviceComponent";

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
        testAction:()=>dispatch(testAction())
    }
};

const DeviceContainer = connect(mapStateToProps, mapDispatchToProps)(DeviceComponent);

export default DeviceContainer;