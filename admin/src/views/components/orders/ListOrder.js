import React, { Component } from "react";
import moment from "moment"
import { Table, Tag, Space, Input, Avatar , Popconfirm, message} from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons"
import { connect } from "react-redux";
import { fetchOrders } from "../../../actions/orders";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const { Search } = Input;

class ListOrder extends Component {
    constructor() {
        super();
        this.state = {
            columns: [
                {
                    title: "ID",
                    dataIndex: "_id",
                    key: "_id",
                },
                {
                    title: "Date",
                    dataIndex: "createdAt",
                    key: "createdAt",
                    render: (text) =>  <div>{moment(new Date(text).toLocaleDateString()).format("MMMM Do YYYY").toString()}</div>

                },
                {
                    title: "Total",
                    dataIndex: "total",
                    key: "total",
                    render: (text) => <div> {text} $ </div>
                },
                {
                    title: "Delivered",
                    key: "delivered",
                    dataIndex: "delivered",
                    render: (text) => <>{
                        text ? (<CheckOutlined style={{color : "green"}} />) : (<CloseOutlined style={{color : "red"}}/>)
                    }</>
                },
                {
                    title: "Paid",
                    key: "paid",
                    dataIndex: "paid",
                    render: (text) => <>{
                        text ? (<CheckOutlined style={{color : "green"}} />) : (<CloseOutlined style={{color : "red"}}/>)
                    }</>
                },
                {
                    title: "Action",
                    key: "action",
                    render: ({ _id  }, record) => (
                        <Space size="middle">
                            {/* <a>View</a> */}
                            {/* <a onClick={() => this.onEditUser(id)}>Edit</a> */}
                            <Link to={`/orders/detail/${_id}`}>Order Detail</Link>
                            <Popconfirm
                                title="Are you sure to delete this task?"
                                onConfirm={this.confirm}
                                onCancel={this.cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <a href="#">Delete</a>
                            </Popconfirm>
                        </Space>
                    ),
                },
            ],
            key: "",
            current: 1,
            pageSize: 10,
            category : 'all'
        };
        this.onSearchDebounce = this.debounce(this.onSearch, 1000);
    }

    onEditUser = (id) => {
        console.log(id);
        setTimeout(() => {
            this.props.history.push(`/users/edit/${id}`);
        }, 2000);
    };

    componentDidMount() {
        const { key, current, pageSize, category } = this.state;
        this.props.fetchOrders({ key, current, pageSize, category });
    }

    onfetchOrders = (key, current, category) => {
        // const { key, current } = this.state;
        const { pageSize } = this.state;
        this.props.fetchOrders({ key, current, pageSize, category });
    };

    onPageChange = (current) => {
        this.setState({ current });
        this.onfetchOrders(this.state.key, current, this.state.category);
    };

    onSearch = (key) => {
        this.setState({ key, current: 1 });
        this.onfetchOrders(key, 1, this.state.category);
    };

    onSearchChange = (event) => {
        let key = event.target.value;
        if (!key) {
            key = "";
        }
        this.onSearchDebounce(key);
    };

    // debounce = (func, wait) => {
    //     let timeout;
    //     return (key) => {
    //         clearTimeout(timeout);
    //         timeout = setTimeout(() => {
    //             func(key);
    //         }, wait);
    //     };
    // };

    debounce = (func, wait) => {
        var timeout;
        return function () {
            const context = this;
            var args = arguments;
            var executeFunction = function () {
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(executeFunction, wait);
        };
    };

    confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
    }
      
    cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    }

    render() {
        const { columns, current, pageSize } = this.state;
        const { list } = this.props;


        return (
            <>
                <Search
                    placeholder="input search text"
                    onSearch={this.onSearch}
                    onChange={this.onSearchChange}
                    enterButton
                    style={{ width: 300, margin: "10px 0" }}
                />
              
                <Table
                    loading={list.loading}
                    columns={columns}
                    dataSource={list.orders}
                    pagination={{
                        pageSize,
                        current,
                        total: list.total,
                        onChange: this.onPageChange,
                    }}
                />
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        list: state.orders.list,
    };
}

export default connect(mapStateToProps, { fetchOrders })(withRouter(ListOrder));
