import React from "react";


// Initialize the Data

const initialState = {
    tasksList: [
        {id: 1, label: "Technical interview with Guillaume", dueDate: '12/12/2022', status: 'Done'},
        {id: 2, label: "Do the exercise of Guillaume", dueDate: '06/11/2020', status: 'Cancelled'},
        {id: 3, label: "Add a new Task", dueDate: '12/09/2020', status: 'Done'},
        {id: 4, label: "Delete Task", dueDate: '10/01/2020', status: 'Done'},
        {id: 5, label: "Update Task", dueDate: '09/07/2022', status: 'Done'},
        {id: 7, label: "List Task", dueDate: '12/11/2022', status: 'Done'},
        {id: 8, label: "Bug correction", dueDate: '10/18/2022', status: 'Done'},
        {id: 9, label: "Add a new future", dueDate: '12/11/2022', status: 'Done'},
        {id: 10, label: "Split elemndts", dueDate: '10/11/2022', status: 'Done'},
    ],
    inputValue: '',
};

// Types of actions

const ADD_TASK = 'ADD_TASK';
const DELETE_TASK = 'DELETE_TASK';
const DONE_TASK = 'DONE_TASK';


// initialize the Reducer
const reducer = (state = initialState, action = {}) => {
    switch (action.type) {

        case ADD_TASK: {
            return {
                ...state,
                tasksList: [
                    ...state.tasksList, action.inputType
                ]
            };
        }

        case DELETE_TASK: {
            const {tasksList} = state;
            const {id: idToDelete} = action;
            const newTasksList = tasksList.filter(currentTask => (currentTask.id !== idToDelete));
            return {
                ...state,
                tasksList: newTasksList,
            };
        }

        case DONE_TASK: {
            const {tasksList} = state;
            const {id} = action.inputValue;
            // map on tasksList to change done property to true with the id
            const newTasksList = tasksList.map((currentTask) => {
                if (currentTask.id === id) {
                    currentTask.label = action.inputValue.label;
                    currentTask.dueDate = action.inputValue.dueDate;
                    currentTask.status = action.inputValue.status;
                }
                return currentTask;
            });
            // return new state
            return {
                ...state,
                tasksList: newTasksList,
            };
        }

        default:
            return state;
    }
};


export const addNewTask = (inputType) => ({
    type: ADD_TASK,
    inputType
});

export const deleteTask = id => ({
    type: DELETE_TASK,
    id,
});

export const doneTask = (inputValue) => ({
    type: DONE_TASK,
    inputValue,
});


export default reducer;
