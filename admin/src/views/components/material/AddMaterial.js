import React, { useState, useEffect, useCallback } from "react";
import { Form, Row, Col, Input, Button, Typography, Upload, message , InputNumber, Select  } from "antd";
import { HighlightFilled, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import jwt_decode from "jwt-decode";

import { useFormInput } from "../../../utils/hooks";
import { connect } from "react-redux";
import { getMaterial, addMaterial , updateMaterial} from "../../../actions/material";
import { useParams } from "react-router-dom";
import {imageUpload} from "../../../utils/imageUpload"

const { Text } = Typography;

function AddMaterial({ addMaterial, 
                        addMaterialState, 
                        getMaterial, 
                        getMaterialState , 
                        token,
                        updateMaterialState,
                        updateMaterial
                                        }) {
    const { TextArea } = Input;
    const { Option } = Select;

    const [id, setId] = useFormInput("");
    const [name, setName] = useFormInput("");
    const [description, setDescription] = useState("");

    const params = useParams();

    useEffect(() => {
        console.log("params: ", params);
        if (params.id) {
            getMaterial(params.id);
        }
    }, []);

    useEffect(() => {
        if (params.id) { //them
            if (getMaterialState.success) {
                let { material } = getMaterialState;
                setId({ target: { value: material._id } });
                setName({ target: { value: material.name } });
                setDescription(material.description)
            }
        }
    }, [getMaterialState.success]);

    const submit = async () => {

        let auth = await jwt_decode(token)
        if(auth.role !== 'admin') 
        // return dispatch({type: 'NOTIFY', payload: {error: 'Authentication is not vaild.'}})
        // return message.info('Authentication is not valid.');

        if(!name) 
        // dispatch({type: 'NOTIFY', payload: {error: 'Name can not be left blank.'}})
        return message.info('Name can not be left blank.');

        // dispatch({type: 'NOTIFY', payload: {loading: true}})
       
        // return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
       
        if (params.id) {
            console.log('dcm')
            // create update user actions, create api, tao reducer
            updateMaterial(params.id, {
                name,
                description
            });
        } else {
            addMaterial({
                name,
                description
            });
        }
    };

    const onchangeDescription = (e) => {
        setDescription(e.target.value)
    }
    
    return (
        <>
            <h3>{params.id ? "Update Material" : "Add Material"}</h3>
            <Row>
                <Col span= {24}>
                    <Form style={{padding: '0 20px 0 0'}}>
                        { params.id ? <Row style={{ margin: "10px 0" }}>
                            ID
                            <Input value={id} onChange={setId} disabled= {true}></Input>   
                            </Row> : ''
                            }
                            
                            <Row style={{ margin: "10px 0" }}>
                                    Name 
                                    <Input value={name} onChange={setName}></Input>
                            </Row>
                            <Row style={{ margin: "10px 0" }}>
                                Description
                                <TextArea rows={4} value={description} onChange={onchangeDescription}></TextArea>
                            </Row>
                            
                                <Button loading={addMaterialState.loading} onClick={submit}>
                                    Submit
                                 </Button>
                            {addMaterialState.success ? (
                                <Text type="success">{addMaterialState.message}</Text>
                            ) : (
                                <Text type="danger">{addMaterialState.message}</Text>
                            )}
                           {
                            updateMaterialState.success ? (
                                <Text type="success">{updateMaterialState.message}</Text>
                            ) : (
                                <Text type="danger">{updateMaterialState.message}</Text>
                            )
                            }
                            
                    </Form>
                </Col>
            </Row>
           
        </>
    );
}

function mapStateToProps(state) {
    return {
        addMaterialState: state.material.addMaterial,
        getMaterialState: state.material.getMaterial,
        token : state.auth.token,
        updateMaterialState: state.material.updateMaterial
    };
}

export default connect(mapStateToProps, { getMaterial, addMaterial , updateMaterial})(AddMaterial);
