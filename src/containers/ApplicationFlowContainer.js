import {connect} from 'react-redux';
import {testAction} from "../actions/index";
import ApplicationFlowComponent from "../components/ApplicationFlowComponent";

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

const ApplicationFlowContainer = connect(mapStateToProps, mapDispatchToProps)(ApplicationFlowComponent);

export default ApplicationFlowContainer;