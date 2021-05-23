import React, { Component } from "react";
import { Table, Tag, Space, Input, Avatar , Popconfirm, message} from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons"
import { connect } from "react-redux";
import { fetchProducts } from "../../../actions/products";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const { Search } = Input;

class ListProduct extends Component {
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
                    title: "Image",
                    dataIndex: "images",
                    key: "images",
                    render: (text) =>  <Avatar shape="square" size={30} src={text[0].url} />

                },
                {
                    title: "Title",
                    dataIndex: "title",
                    key: "title",
                    render: (text) => <div> {text} </div>
                },
                {
                    title: "Price",
                    key: "price",
                    dataIndex: "price",
                    render: (text) => <div> {text} $ </div>
                },
                {
                    title: "inStock",
                    key: "inStock",
                    dataIndex: "inStock",
                    render: (text) => (
                        <>
                            { text  ? 
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
                    title: "Sold",
                    key: "sold",
                    dataIndex: "sold",
                    render : (text) => <div> {text} </div>
                },
                {
                    title: "Action",
                    key: "action",
                    render: ({ _id , root }, record) => (
                        !root &&
                        <Space size="middle">
                            {/* <a>View</a> */}
                            {/* <a onClick={() => this.onEditUser(id)}>Edit</a> */}
                            <Link to={`/products/edit/${_id}`}>Edit</Link>
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
        this.props.fetchProducts({ key, current, pageSize, category });
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
                    dataSource={list.products}
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

ListProduct.propTypes = {
    fetchProducts: PropTypes.func.isRequired,
    list: PropTypes.shape({
        total: PropTypes.number.isRequired,
        loading: PropTypes.bool.isRequired,
        products: PropTypes.array.isRequired,
    }),
};

function mapStateToProps(state) {
    return {
        list: state.products.list,
    };
}

export default connect(mapStateToProps, { fetchProducts })(withRouter(ListProduct));
