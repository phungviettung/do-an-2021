import React, { useState, useEffect, useCallback } from "react";
import { Form, Row, Col, Input, Button, Typography, Upload, message , InputNumber, Select  } from "antd";
import { HighlightFilled, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import jwt_decode from "jwt-decode";

import { useFormInput } from "../../../utils/hooks";
import { connect } from "react-redux";
import { getCategory, addCategory , updateCategory} from "../../../actions/categories";
import { fetchCategories } from "../../../actions/categories";
import { useParams } from "react-router-dom";
import {imageUpload} from "../../../utils/imageUpload"

const { Text } = Typography;

function AddCategory({ addCategory, 
                        addCategoryState, 
                        getCategory, 
                        getCategoryState , 
                        token,
                        updateCategoryState,
                        updateCategory
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
            getCategory(params.id);
        }
    }, []);

    useEffect(() => {
        if (params.id) { //them
            if (getCategoryState.success) {
                let { category } = getCategoryState;
                setId({ target: { value: category._id } });
                setName({ target: { value: category.name } });
                setDescription(category.description)
            }
        }
    }, [getCategoryState.success]);

    const submit = async () => {

        let auth = await jwt_decode(token)
        if(auth.role !== 'admin') 
        // return dispatch({type: 'NOTIFY', payload: {error: 'Authentication is not vaild.'}})
        return message.info('Authentication is not valid.');

        if(!name) 
        // dispatch({type: 'NOTIFY', payload: {error: 'Name can not be left blank.'}})
        return message.info('Name can not be left blank.');

        // dispatch({type: 'NOTIFY', payload: {loading: true}})
       
        // return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
       
        if (params.id) {
            console.log('dcm')
            // create update user actions, create api, tao reducer
            updateCategory(params.id, {
                name,
                description
            });
        } else {
            addCategory({
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
            <h3>{params.id ? "Update user" : "Add user"}</h3>
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
                            
                                <Button loading={addCategoryState.loading} onClick={submit}>
                                    Submit
                                 </Button>
                            {addCategoryState.success ? (
                                <Text type="success">{addCategoryState.message}</Text>
                            ) : (
                                <Text type="danger">{addCategoryState.message}</Text>
                            )}
                           {
                            updateCategoryState.success ? (
                                <Text type="success">{updateCategoryState.message}</Text>
                            ) : (
                                <Text type="danger">{updateCategoryState.message}</Text>
                            )
                            }
                            
                    </Form>
                </Col>
            </Row>
            {JSON.stringify(addCategoryState)}
            {JSON.stringify(updateCategoryState)}
        </>
    );
}

function mapStateToProps(state) {
    return {
        addCategoryState: state.categories.addCategory,
        getCategoryState: state.categories.getCategory,
        token : state.auth.token,
        updateCategoryState: state.categories.updateCategory
    };
}

export default connect(mapStateToProps, { getCategory, addCategory , updateCategory})(AddCategory);
