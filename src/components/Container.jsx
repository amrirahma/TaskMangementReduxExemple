import React from "react";
import "antd/dist/antd.css";
import Header from "./Header";
import ListTasks from "./ListTasks";

function Container(props) {
    return (
        <div>
            <Header props={props}></Header>
            <ListTasks props={props} tasksList={props.tasksList} deleteTask={props.deleteTask}
                       doneTask={props.doneTask}> </ListTasks>

        </div>
    )
}

export default Container


