import 'antd/dist/antd.css';
import {Button, Modal, Form, Input, Select, DatePicker} from 'antd';
import React, {useState} from 'react';
import moment from 'moment';

function AddTaskModal({props}) {

    //console.log('props:', props);

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const onFinish = (values: any) => {
        //console.log('values' + JSON.stringify(values));
        let data = {
            id: 7,
            label: values.label,
            dueDate: moment(new Date(values.dueDate)).format('L'),
            status: values.status
        }
        props.addNewTask(data);
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Add Task
            </Button>
            <Modal
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <div align='left'>
                    <Form
                        name="Update Task"
                        labelCol={{span: 4}}
                        wrapperCol={{span: 6}}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Label"
                            name="label"
                        >
                            <Input/>
                        </Form.Item>


                        <Form.Item label="Date" name="dueDate">
                            <DatePicker/>
                        </Form.Item>
                        <Form.Item label="Status" name="status">
                            <Select>
                                <Select.Option value="Done">Done</Select.Option>
                                <Select.Option value="In Progress">In Progress</Select.Option>
                                <Select.Option value="To-Do"> To-Do</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            </Modal>
        </>
    );
}


export default AddTaskModal


