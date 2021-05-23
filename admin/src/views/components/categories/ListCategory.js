import React, { Component } from "react";
import { Table, Tag, Space, Input, Avatar } from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons"
import { connect } from "react-redux";
import { fetchCategories } from "../../../actions/categories";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const { Search } = Input;

class ListCategory extends Component {
    constructor() {
        super();
        this.state = {
            columns: [
                // {
                //     title: "ID",
                //     dataIndex: "_id",
                //     key: "_id",
                // },
                {
                    title: "Name",
                    dataIndex: "name",
                    key: "name",
                    render: (text) => <div> {text} </div>
                },
                {
                    title: "Description",
                    key: "description",
                    dataIndex: "description",
                    render: (text) => <div> {text} </div>
                },
                {
                    title: "Action",
                    key: "action",
                    render: ({ _id , root }) => (
                        <Space size="middle">
                            <a>View</a>
                            {/* <a onClick={() => this.onEditUser(id)}>Edit</a> */}
                            <Link to={`/categories/edit/${_id}`}>Edit</Link>
                            <a>Delete</a>
                        </Space>
                    ),
                },
            ],
            key: "",
            current: 1,
            pageSize: 10,
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
        const { key, current, pageSize } = this.state;
        this.props.fetchCategories({ key, current, pageSize });
    }

    onfetchProducts = (key, current, category) => {
        // const { key, current } = this.state;
        const { pageSize } = this.state;
        this.props.fetchProducts({ key, current, pageSize, category });
    };

    onPageChange = (current) => {
        this.setState({ current });
        this.onfetchProducts(this.state.key, current, this.state.category);
    };

    onSearch = (key) => {
        this.setState({ key, current: 1 });
        this.onfetchProducts(key, 1, this.state.category);
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
                    dataSource={list.categories}
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
        list: state.categories.list,
    };
}

export default connect(mapStateToProps, { fetchCategories })(withRouter(ListCategory));
