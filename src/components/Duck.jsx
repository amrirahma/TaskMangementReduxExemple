import {connect} from 'react-redux';
import {addNewTask, deleteTask, doneTask} from '../store/reducer';
import Container from "./Container";


const mapStateToProps = state => ({
    tasksList: state.tasksList,
});


const mapDispatchToProps = (dispatch, ownProps) => ({
    deleteTask: (id) => {
        dispatch(deleteTask(id));
    },
    doneTask: (inputValue) => {
        dispatch(doneTask(inputValue));
    },
    addNewTask: (inputType) => {
        dispatch(addNewTask(inputType));
    },
});


const TaskContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Container);


export default TaskContainer;

