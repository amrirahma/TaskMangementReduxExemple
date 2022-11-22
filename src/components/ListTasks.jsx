import "antd/dist/antd.css";
import {Button, Table, Modal, Input, Result, Tag, Form, DatePicker, Select} from "antd";
import {useState, useEffect} from "react";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import React from "react";
import moment from 'moment';

function ListTasks({tasksList, deleteTask, doneTask}, props) {
    const [list, setList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingTask, setEditingTask] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const columns = [
        {
            key: "1",
            title: "Label",
            dataIndex: "label",
            render: (label) => {
                return <p>{label}</p>
            },
        },
        {
            key: "2",
            title: "Due Date",
            dataIndex: "dueDate",
            sorter: (previousDate, latestDate) => {
                const previous = moment(previousDate.dueDate);
                const latest = moment(latestDate.dueDate);
                return moment(previous).isBefore(latest)
            },
            render: (dueDate) => {
                const currentDate = moment(new Date());
                const newDueDate = moment(dueDate);
                if (moment(newDueDate).isBefore(currentDate)) {
                    return (
                        <Tag color="#f50">{moment(new Date(dueDate)).format('MM-DD-YYYY')} </Tag>
                    )
                } else {
                    return (<Tag color="#87d068">{moment(new Date(dueDate)).format('L')}</Tag>)
                }
            },
        },
        {
            key: "3",
            title: "Status",
            dataIndex: "status",
            render: (status) => {
                return <p>{status}</p>
            },


        },

        {
            key: "5",
            title: "Actions",
            render: (record) => {
                return (
                    <>
                        <EditOutlined
                            onClick={() => {
                                onEditTask(record);
                            }}
                        />
                        <DeleteOutlined
                            onClick={() => {
                                onDeleteTask(record);
                            }}
                            style={{color: "red", marginLeft: 12}}
                        />
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        setList(tasksList)
        setEditingTask(null)

    }, [doneTask, tasksList, props]);

    const onDeleteTask = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to delete this task ?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                deleteTask(record.id);
            },
        });
    };
    const onEditTask = (record) => {
        // console.log("record" + JSON.stringify(record));
        setIsEditing(true);
        setEditingTask({...record});
    };
    const resetEditing = () => {
        setIsEditing(false);
        setEditingTask(null);
    };

    const onFinish = (values: any) => {
        setIsEditing(false);
        let data = {
            id: editingTask.id,
            label: !editingTask.label ? editingTask.label : values.label,
            dueDate: !editingTask.dueDate ? new Date(values.dueDate) : new Date(values.dueDate),
            status: !editingTask.status ? editingTask.status : values.status,
        }

        doneTask(data);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <div className="App">
            <header className="App-header">
                {list.length > 0 &&
                    <Table key={Math.random()} columns={columns} dataSource={list} pagination={{
                        current: page, pageSize: pageSize,
                        onChange: (page, pageSize) => {
                            setPage(page);
                            setPageSize(pageSize)
                        }
                    }}></Table>
                }
                <Modal title="Update Task " open={isEditing} onOk={handleOk} onCancel={handleCancel} footer={null}>
                    <Form
                        initialValues={{
                            ["dueDate"]: moment(editingTask?.dueDate, 'MM/DD/YYYY'),
                            ["status"]: editingTask?.status,
                        }}
                        name="Update Task"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={resetEditing}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Label"
                            name="label"
                            initialValue={editingTask?.label}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item label="Due Date" name="dueDate">
                            <DatePicker format={'MM/DD/YYYY'}/>
                        </Form.Item>

                        <Form.Item label="Status" name="status">
                            <Select>
                                <Select.Option value="Done">Done</Select.Option>
                                <Select.Option value="In Progress">In Progress</Select.Option>
                                <Select.Option value="To-Do"> To-Do</Select.Option>
                            </Select>
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal>


            </header>
        </div>
    );
}

export default ListTasks;
