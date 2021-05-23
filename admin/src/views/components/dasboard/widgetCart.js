import React, { useState, useEffect } from "react";
import { Form, Row, Col, Input, Button, Typography } from "antd";
import {ShoppingCartOutlined, UpOutlined} from "@ant-design/icons"
import { useFormInput } from "../../../utils/hooks";
import { connect } from "react-redux";
import { addUser, getUser } from "../../../actions/users";
import { useParams } from "react-router-dom";

const { Text } = Typography;

function WidgetCart({ addUser, addUserState, getUser, getUserState, style }) {
    useEffect(() => {
       
    }, []);

    return (
        <>
            <div class="ibox bg-success color-white widget-stat">
                <div class="ibox-body">
                    <h2 class="m-b-5 font-strong">201</h2>
                    <div class="m-b-5">NEW ORDERS</div><i class="ti-shopping-cart widget-stat-icon"><ShoppingCartOutlined /></i>
                    <div><i class="fa fa-level-up m-r-5"><UpOutlined /></i><small> 25% higher </small></div>
                </div>
            </div>
        </>
    );
}

function mapStateToProps(state) {
    return {
        addUserState: state.users.addUser,
        getUserState: state.users.getUser,
    };
}

export default connect(mapStateToProps, { addUser, getUser })(WidgetCart);
