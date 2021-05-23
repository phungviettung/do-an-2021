import React, { Component } from "react";
import { Table, Tag, Space, Input, Avatar,  Modal, Button, Col, Row } from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons"
import { connect } from "react-redux";
import { fetchUsers } from "../../../actions/users";
import { Link, withRouter , Route } from "react-router-dom";
import PropTypes from "prop-types";

const { Search } = Input;

class ListUser extends Component {
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
                    title: "Avatar",
                    dataIndex: "avatar",
                    key: "avatar",
                    render: (text) =>  <Avatar src={text} />

                },
                {
                    title: "Name",
                    dataIndex: "name",
                    key: "name",
                    render: (text) => <a>{text}</a>,
                },
                {
                    title: "Role",
                    key: "role",
                    dataIndex: "role",
                    render: (text) => (
                        <>
                            { text == 'admin' ? 
                                <Tag color={"green"} key={"1"}>
                                    {text}
                                </Tag> : <Tag color={"red"} key={"1"}>
                                    {text}
                                </Tag>
                            } 
                            
                        </>
                    )
                },
                {
                    title: "Root",
                    key: "root",
                    dataIndex: "root",
                    render: (text) => (
                        <>
                            { text ? 
                                <CheckOutlined style={{color: 'green' }} />
                                 : <CloseOutlined style={{color: 'red' }} />
                            } 
                            
                        </>
                    )
                },
                {
                    title: "Email",
                    dataIndex: "email",
                    key: "email",
                },
                {
                    title: "Action",
                    key: "action",
                    render: ({ _id , root }) => (
                        !root &&
                        <Space size="middle">
                            <a>View</a>
                            {/* <a onClick={() => this.onEditUser(_id)}>Edit</a> */}
                            <Link to={`/users/edit/${_id}`}>Edit</Link>
                            <a>Delete</a>
                        </Space>
                    ),
                },
            ],
            key: "",
            current: 1,
            pageSize: 5,
            isModalVisible : false
        };
        this.onSearchDebounce = this.debounce(this.onSearch, 1000);
    }
    
    // onEditUser = (id) => {
    //     console.log(id);
    //     setTimeout(() => {
    //         this.props.history.push(`/users/edit/${id}`);
    //     }, 2000);
    // };

    componentDidMount() {
        const { key, current, pageSize } = this.state;
        this.props.fetchUsers({ key, current, pageSize });
    }

    onFetchUsers = (key, current) => {
        // const { key, current } = this.state;
        const { pageSize } = this.state;
        this.props.fetchUsers({ key, current, pageSize });
    };

    onPageChange = (current) => {
        this.setState({ current });
        this.onFetchUsers(this.state.key, current);
    };

    onSearch = (key) => {
        this.setState({ key, current: 1 });
        this.onFetchUsers(key, 1);
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

    // modal

    showModal = () => {
        this.setState({
            isModalVisible : true
        })
    };

    handleOk = () => {
        this.setState({
            isModalVisible : false
        })        
    };

    handleCancel = () => {
        this.setState({
            isModalVisible : false
        })
    };
    // end modal


    render() {
        const { columns, current, pageSize } = this.state;
        const { list } = this.props;
        const AddUser = React.lazy(() => import("./AddUser"));
        
        return (
            <>
                <div style={
                    {
                        display : "flex",
                        justifyContent: "space-between",
                        margin: "10px 0"
                    }
                }>
                    <Search
                            placeholder="input search text"
                            onSearch={this.onSearch}
                            onChange={this.onSearchChange}
                            enterButton
                            style={{ width: 300 }}
                    />
                    <Button type="primary" onClick={this.showModal}>
                            Create user
                    </Button>
                </div>
                
                <Modal title="Basic Modal" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}
                    footer= {null}
                >
                   <AddUser></AddUser>
                </Modal>
                <Row>
                    <Col span={24}>
                        <Table
                        loading={list.loading}
                        columns={columns}
                        dataSource={list.users}
                        pagination={{
                            pageSize,
                            current,
                            total: list.total,
                            onChange: this.onPageChange,
                        }}
                    />
                    </Col>
                    
                </Row>
                
            </>
        );
    }
}

ListUser.propTypes = {
    fetchUsers: PropTypes.func.isRequired,
    list: PropTypes.shape({
        total: PropTypes.number.isRequired,
        loading: PropTypes.bool.isRequired,
        users: PropTypes.array.isRequired,
    }),
};

function mapStateToProps(state) {
    return {
        list: state.users.list,
    };
}

export default connect(mapStateToProps, { fetchUsers })(withRouter(ListUser));
