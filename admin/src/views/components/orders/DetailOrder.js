import React, { useState, useEffect, useCallback } from "react";
import { Form, Row, Col, Input, Button, Typography, Upload, message , InputNumber, Select, Tag ,Card } from "antd";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
  } from '@ant-design/icons';
import { HighlightFilled, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import jwt_decode from "jwt-decode";

import { useFormInput } from "../../../utils/hooks";
import { connect } from "react-redux";
import { getOrder, updateOrderDelivered} from "../../../actions/orders";
import { getUser } from "../../../actions/users";
import { useParams } from "react-router-dom";
import {imageUpload} from "../../../utils/imageUpload"
import moment from "moment"

const { Text } = Typography;
const { Title } = Typography;
const { Meta } = Card;

function DetailOrder({ 
                        getOrder, 
                        getOrderState , 
                        token,
                        updateOrderStateDeliver,
                        updateOrderDelivered,
                        getUser,
                        getUserState
                                        }) {
    const { TextArea } = Input;
    const { Option } = Select;

    const [id, setId] = useState("");
    const [payment, setPayment] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [paymentId, setPaymentId] = useState("");
    const [cart, setCart] = useState([]);
    const [nameUser, setNameUser] = useState("");
    const [emailUser, setEmailUser] = useState("");

    const [mobileOrder, setMobileOrder] = useState("");
    const [addressOrder, setAddressOrder] = useState("");
    const [delivered, setDelivered] = useState("");
    const [updatedAt, setupdatedAt] = useState("");
    const [dateOfPayment, setdateOfPayment] = useState("");
    

    const params = useParams();

    useEffect(() => {
        console.log("params: ", params);
        if (params.id) {
            getOrder(params.id);
        }
    }, []);

    useEffect(() => {
        console.log('aloooooooooooo',getOrderState);
        if (params.id) { //them
            if (getOrderState.success) {
                let { order } = getOrderState;
                setId(order._id);     
                setPayment(order.paid)  
                if (order.method) {
                    setPaymentMethod(order.method)   
                }   
                if(order.paymentId){
                    setPaymentId(order.paymentId)
                }  
                setCart(order.cart)
                setMobileOrder(order.mobile)
                setAddressOrder(order.address)
                setDelivered(order.delivered)
                setupdatedAt(order.updatedAt)
                setdateOfPayment(order.dateOfPayment)

                getUser(order.user)

                // setNameUser(getUserState.name)
            }
        }
        return () =>{
            console.log('destroy')
            setPaymentMethod('')   
            setPaymentId('')
        }
    }, [getOrderState.success]);

    useEffect(() => {
        if(getUserState.success) {
            let  {name , email } = getUserState.user
            setNameUser(name)
            setEmailUser(email)
        }
       
    }, [getUserState.success])
    const submit = async () => {
        if (params.id) {
            // create update user actions, create api, tao reducer
            // updateOrder(params.id, {
            //     title, price, inStock, description, content, category, images: [...imgOldURL, ...media]
            // });
        } else {
            // addProduct({
            //     title, price, inStock, description, content, category, images: [...imgOldURL, ...media]
            // });
        }
    };
    const handleDelivered = () => {
        console.log('hihi')
        // dispatch({type: 'NOTIFY', payload: {loading: true}})
        updateOrderDelivered(id)
        // patchData(`order/delivered/${order._id}`, null, auth.token)
        // .then(res => {
        //     if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

        //     const { paid, dateOfPayment, method, delivered } = res.result

        //     dispatch(updateItem(orders, order._id, {
        //         ...order, paid, dateOfPayment, method, delivered
        //     }, 'ADD_ORDERS'))

        //     return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        // })
    }
    return (
        <>
         <Title level={3}>Order : {id}</Title>
         <Title level={4}>Shipping</Title>
         <Title level={4}>Name : {nameUser }</Title>
         <Title level={4}>Email : {emailUser }</Title>
         <Title level={4}>Phone : { mobileOrder }</Title>
         <Title level={4}>Address : { addressOrder }</Title>

         {
             updateOrderStateDeliver.result.result ? (
                updateOrderStateDeliver.result.result.delivered ? (<Tag icon={<CheckCircleOutlined />} color="success">
                Deliverd on {updatedAt}
                </Tag>) 
                : (
                    <Tag icon={<CloseCircleOutlined />} color="error">
                    Not Delivered
                </Tag>)
             ) : (
                delivered ? (<Tag icon={<CheckCircleOutlined />} color="success">
                Deliverd on {updatedAt}
                </Tag>) 
                : (
                    <>
                    <Tag icon={<CloseCircleOutlined />} color="error">
                    Not Delivered
                    </Tag>
                    {
                        // jwt_decode(token).role === 'admin' && !delivered &&
                        <button className="btn btn-dark text-uppercase"
                        onClick={() => handleDelivered()}>
                            Mark as delivered
                        </button>
                     }
                    </>
                )
                
             )
         
        }
        

        {/* {updateOrderStateDeliver.result.result.delivered} */}
        <br></br>
         <Title level={4}>Payment</Title>
         {paymentMethod && (<div level={5}>Payment method : {paymentMethod} </div>)}
         {paymentId.length ? (<div level={5}>Payment Id : {paymentId} </div>): ''}
         <Row>
            { updateOrderStateDeliver.result.result ? (
                    updateOrderStateDeliver.result.result.paid ? (<Tag icon={<CheckCircleOutlined />} color="success">
                    Paid on {updateOrderStateDeliver.result.result.dateOfPayment}
                    </Tag>) 
                    : (
                        <Tag icon={<CloseCircleOutlined />} color="error">
                        Not paid
                    </Tag>
                    )
                ) : (
                    payment ? (<Tag icon={<CheckCircleOutlined />} color="success">
                    Paid on {dateOfPayment}
                    </Tag>) 
                    : (
                        <Tag icon={<CloseCircleOutlined />} color="error">
                        Not paid
                    </Tag>
                    )
                )

            }
            

         </Row>
         <Title level={4}>Order item</Title>
         {
             cart.map(item => (

                <div className="row border-bottom mx-0 p-2 justify-content-betwenn
                align-items-center" key={item._id} style={{maxWidth: '550px'}}>
                    <img src={item.images[0].url} alt={item.images[0].url}
                    style={{width: '50px', height: '45px', objectFit: 'cover'}} />
        
                    <h5 className="flex-fill text-secondary px-3 m-0">
                        <a href={`http://localhost:3000/product/${item._id}`}>
                            <a>{item.title}</a>
                        </a>
                    </h5>
        
                    <span className="text-info m-0">
                        {item.quantity} x {item.price}.000đ = {item.price * item.quantity}.000đ
                    </span>
        
                </div>
            ))    
            
         }
        </>
    );
}

function mapStateToProps(state) {
    return {
        getOrderState: state.orders.getOrder,
        token : state.auth.token,
        updateOrderStateDeliver: state.orders.updateOrderDeliver,
        getUserState : state.users.getUser
    };
}

export default connect(mapStateToProps, { getOrder , updateOrderDelivered, getUser})(DetailOrder);
