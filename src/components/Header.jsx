import React from "react";
import "antd/dist/antd.css";
import {PageHeader, Tabs} from "antd";
import AddTaskModal from "./AddTaskModal";

function Header({props}) {
    return (
        <PageHeader
            className="site-page-header-responsive"
            extra={[
                <AddTaskModal props={props}> </AddTaskModal>
            ]}
            footer={
                <Tabs defaultActiveKey="1" key={Math.random()}>
                </Tabs>
            }
        >

        </PageHeader>)
}

export default Header


