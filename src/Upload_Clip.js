import React from 'react';
import { Input, Menu, Dropdown, message, Checkbox, Divider, Upload, Button, Tag } from 'antd';
import { DownOutlined, UploadOutlined } from '@ant-design/icons';
import EditableTagGroup from './Tag'
import 'antd/dist/antd.css';
// import { Card } from '@mui/material'

const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
};

const menu = (
    <Menu onClick={onClick}>
        <Menu.Item key="1">1st menu item</Menu.Item>
        <Menu.Item key="2">2nd menu item</Menu.Item>
        <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
);

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = [];


const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
            console.log(file, fileList);
        }
    },
    defaultFileList: [
        {
            uid: '1',
            name: 'xxx.png',
            status: 'done',
            response: 'Server Error 500', // custom error message to show
            url: 'http://www.baidu.com/xxx.png',
        },
        {
            uid: '2',
            name: 'yyy.png',
            status: 'done',
            url: 'http://www.baidu.com/yyy.png',
        },

    ],
};


function Upload_Clip() {
    const [checkedList, setCheckedList] = React.useState();
    const [indeterminate, setIndeterminate] = React.useState(true);
    const [checkAll, setCheckAll] = React.useState(false);

    const onChange = list => {
        // checkedList = list
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
        console.log(checkedList);
    };

    const onCheckAllChange = e => {
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    return (
        <div>
            <p>Hiii</p>
            <p>Enter Title</p>
            <Input placeholder="Basic usage" size="large" maxLength="140" />
            <p>Channel Name</p>
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    Hover me, Click menu item <DownOutlined />
                </a>
            </Dropdown>
            <p>Language</p>
            {/* <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                Check all
            </Checkbox> */}
            <Divider />
            <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
            <p>upload file</p>
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            <EditableTagGroup />
            <Button>Upload Clip</Button>

        </div>
    );
}

export default Upload_Clip;
