import React, { useState, useEffect } from "react";
import { Form, Row, Col, Input, Button, Typography } from "antd";
import {ShoppingCartOutlined, UpOutlined, DownOutlined} from "@ant-design/icons"
import { useFormInput } from "../../../utils/hooks";
import { connect } from "react-redux";
import { addUser, getUser } from "../../../actions/users";
import { useParams } from "react-router-dom";
import ColumnGroup from "antd/lib/table/ColumnGroup";

const { Text } = Typography;

function WidgetCart(props ) {
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
                    <h2 className="m-b-5 font-strong">{props.total}</h2>
                    <div className="m-b-5">ORDERS</div><i className="ti-shopping-cart widget-stat-icon"><ShoppingCartOutlined /></i>
                    <div><i className="fa fa-level-up m-r-5">
                       {per > 0 ? <UpOutlined /> : <DownOutlined />}
                    </i><small>{per.toString().replace('-','')} % {hightLow} </small></div>
                </div>
            </div>
        </>
    );
}

function mapStateToProps(state) {
    return {
      
    };
}

export default connect(mapStateToProps, {  })(WidgetCart);
