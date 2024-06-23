import React from 'react';
import { Table } from 'antd';
export default function TableFilter() {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            filters: [
                {
                    text: '北京',
                    value: '北京',
                },
                {
                    text: '上海',
                    value: '上海',
                },
            ],
            onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
    ];
    const data = [
        {
            key: '1',
            name: '猪八戒',
            age: 32,
            address: '北京',
        },
        {
            key: '2',
            name: '孙悟空',
            age: 42,
            address: '上海',
        },
        {
            key: '3',
            name: '唐僧',
            age: 32,
            address: '北京',
        },
        {
            key: '4',
            name: '沙悟净',
            age: 32,
            address: '上海',
        },
    ];
    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}

