import {connect} from 'react-redux';
import {testAction} from "../actions/index";
import DeviceComponent from "../components/DeviceComponent";

const mapStateToProps = (state) => {
    return {
        //test:state.Hello.test
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        testAction:()=>dispatch(testAction())
    }
};

const DeviceContainer = connect(mapStateToProps, mapDispatchToProps)(DeviceComponent);

export default DeviceContainer;