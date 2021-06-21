import React, { useState, useEffect } from "react";
import { Form, Row, Col, Input, Button, Typography } from "antd";
import {ShoppingCartOutlined, UpOutlined, MoneyCollectOutlined, DownOutlined} from "@ant-design/icons"
import { useFormInput } from "../../../utils/hooks";
import { connect } from "react-redux";
// import { addUser, getUser } from "../../../actions/dashboard";
import { useParams } from "react-router-dom";

const { Text } = Typography;

function WidgetTotalIncome( props ) {
    const [per,setPer] = useState(50)
    const [color,setColor] = useState('ibox bg-success color-white widget-stat')
    const [hightLow,setHightLow] = useState('')

    useEffect(() => {
        if(props.total && props.preTotal){
            let diff =  props.total - props.preTotal
            setPer( Math.round(diff / props.preTotal * 100))
            if (diff < 0) {
                setColor('ibox bg-danger color-white widget-stat')
                setHightLow('lower')
            }else{
                setColor('ibox bg-success color-white widget-stat')
                setHightLow('higher')
            }
        }
    }, [props]);

    return (
        <>
            <div className={color}>
                <div className="ibox-body">
                    <h2 className="m-b-5 font-strong">{props.total}.000đ</h2>
                    <div className="m-b-5">TOTAL INCOME</div><i className="ti-shopping-cart widget-stat-icon"><MoneyCollectOutlined /></i>
                    <div><i className="fa fa-level-up m-r-5">
                    {per > 0 ? <UpOutlined /> : <DownOutlined />}    
                    </i><small> {per.toString().replace('-','')} % {hightLow} </small></div>
                </div>
            </div>
        </>
    );
}

function mapStateToProps(state) {
    return {
        // addUserState: state.users.addUser,
        // getUserState: state.users.getUser,
    };
}

export default connect(mapStateToProps, {  })(WidgetTotalIncome);
