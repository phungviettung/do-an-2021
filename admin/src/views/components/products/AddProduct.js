import React, { useState, useEffect, useCallback } from "react";
import { Form, Row, Col, Input, Button, Typography, Upload, message , InputNumber, Select  } from "antd";
import { HighlightFilled, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import jwt_decode from "jwt-decode";

import { useFormInput } from "../../../utils/hooks";
import { connect } from "react-redux";
import { getProduct, addProduct , updateProduct} from "../../../actions/products";
import { fetchCategories } from "../../../actions/categories";
import { fetchMaterial } from "../../../actions/material";
import { useParams } from "react-router-dom";
import {imageUpload} from "../../../utils/imageUpload"

const { Text } = Typography;

function AddProduct({ addProduct, 
                        addProductState, 
                        getProduct, 
                        getProductState , 
                        fetchCategories, 
                        fetchMaterial,
                        getCategoriesState, 
                        token,
                        updateProduct,
                        updateProductState,
                        getMaterialState
                                        }) {
    const { TextArea } = Input;
    const { Option } = Select;

    const [id, setId] = useFormInput("");
    const [title, setTitle] = useFormInput("");
    const [images, setImages] = useState([])
    const [price, setPrice] = useState("")
    const [inStock, setInstock] = useState('')
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [material, setMaterial] = useState("");

    const params = useParams();

    useEffect(() => {
        console.log("params: ", params);
        if (params.id) {
            getProduct(params.id);
        }
        fetchCategories()
        fetchMaterial()
    }, []);

    useEffect(() => {
        console.log('getCategoriesState',getCategoriesState);
        if (params.id) { //them
            if (getProductState.success) {
                let { product } = getProductState;
                setId({ target: { value: product._id } });
                setTitle({ target: { value: product.title } });
                setImages(product.images)
                setPrice(product.price)
                setInstock(product.inStock)
                setDescription(product.description)
                setContent(product.content)
                setCategory(product.category)
                setMaterial(product.material)
            }
        }
    }, [getProductState.success]);

    const submit = async () => {
        let auth = await jwt_decode(token)
        if(auth.role !== 'admin') 
        // return dispatch({type: 'NOTIFY', payload: {error: 'Authentication is not valid.'}})
        // return message.info('Authentication is not valid.');

        if(!title || !price || !inStock || !description || !content || category === 'all' || images.length === 0)
        // return dispatch({type: 'NOTIFY', payload: {error: 'Please add all the fields.'}})
        return message.info('Please add all the fields.');

        // dispatch({type: 'NOTIFY', payload: {loading: true}})
        let media = []

        const imgNewURL = images.filter(img => !img.url)
        const imgOldURL = images.filter(img => img.url)
        

        if(imgNewURL.length > 0) media = await imageUpload(imgNewURL)

        if (params.id) {
            // create update user actions, create api, tao reducer
            updateProduct(params.id, {
                title, price, inStock, description, content, category, images: [...imgOldURL, ...media]
            });
        } else {
            addProduct({
                title, price, inStock, description, content, category, images: [...imgOldURL, ...media]
            });
        }
    };
    

    const handleUploadInput = e => {
        // dispatch({type: 'NOTIFY', payload: {}})
        let newImages = []
        let num = 0
        let err = ''
        const files = [...e.target.files]

        if(files.length === 0) 
        // return dispatch({type: 'NOTIFY', payload: {error: 'Files does not exist.'}})
        return message.info('Files does not exist.');

        files.forEach(file => {
            if(file.size > 1024 * 1024)

            return err = 'The largest image size is 1mb'
           
            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
            return err = 'Image format is incorrect.'

            num += 1;
            if(num <= 5) newImages.push(file)
            return newImages;
        })

        if(err)
        // dispatch({type: 'NOTIFY', payload: {error: err}})
        message.info(err);

        const imgCount = images.length
        if(imgCount + newImages.length > 5)
        // return dispatch({type: 'NOTIFY', payload: {error: 'Select up to 5 images.'}})
        return message.info('Select up to 5 images.');

        setImages([...images, ...newImages])
    }

    const deleteImage = index => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const onChangePrice = (value) => {
        setPrice(value)
    }
    const onChangeCategory = (value) => {
        setCategory(value)
    }
    const onChangeMaterial = (value) => {
        setMaterial(value)
    }
    const onchangeDescription = (e) => {
        setDescription(e.target.value)
    }
    const onchangeContent = (e) => {
        setContent(e.target.value)
    }
    return (
        <>
            <h3>{params.id ? "Update product" : "Add product"}</h3>
            <Row>
                <Col span= {12}>
                    <Form style={{padding: '0 20px 0 0'}}>
                        { params.id ? <Row style={{ margin: "10px 0" }}>
                            ID
                            <Input value={id} onChange={setId} disabled= {true}></Input>   
                            </Row> : ''
                            }
                            
                            <Row style={{ margin: "10px 0" }}>
                                    Title
                                    <Input value={title} onChange={setTitle}></Input>
                            </Row>
                            <Row style={{ margin: "10px 0" }}>
                                {/* <Col span={4}>Title</Col> */}
                                <Col span={6} style={{ padding: "0px 10px 0px 0 px" }}>
                                    Price <br></br>
                                    <InputNumber defaultValue={1000}
                                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                        onChange={onChangePrice}
                                        value = {price}
                                        >
                                        </InputNumber >
                                </Col>
                                <Col span={6}>
                                    Instock <br></br>
                                    <InputNumber value={inStock} onChange={(value) => setInstock(value)}></InputNumber >
                                </Col>
                            </Row> 
                            <Row style={{ margin: "10px 0" }}>
                                Description
                                <TextArea rows={4} value={description} onChange={onchangeDescription}></TextArea>
                            </Row>
                            <Row style={{ margin: "10px 0" }}>
                                Content 
                                <TextArea rows={4} value={content}  onChange={ onchangeContent } ></TextArea>
                            </Row>
                            
                                <Col span={12} style={{ marginBottom: "20px" }} >
                                    Category <br></br>
                                    <Select
                                        showSearch
                                        style={{ width: 300 }}
                                        placeholder="Select a category"
                                        optionFilterProp="children"
                                        // onChange={onChangeCategory}
                                        filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        value={category}
                                        onChange={value => setCategory(value)}
                                    >
                                        {
                                            getCategoriesState.map( item=>(
                                                <Option value={item._id}>{item.name}</Option>
                                            ))
                                        }
                                    </Select>
                                 </Col>

                                 <Col span={12} style={{ marginBottom: "20px" }} >
                                    Material <br></br>
                                    <Select
                                        showSearch
                                        style={{ width: 300 }}
                                        placeholder="Select a material"
                                        optionFilterProp="children"
                                        // onChange={onChangeMaterial}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        value={material}
                                        onChange={value => setMaterial(value)}
                                    >
                                        {
                                            getMaterialState.map( item=>(
                                                <Option value={item._id}>{item.name}</Option>
                                            ))
                                        }
                                    </Select>
                                 </Col>

                                <Button loading={addProductState.loading} onClick={submit}>
                                    Submit
                                 </Button>
                            {addProductState.success ? (
                                <Text type="success">{addProductState.message}</Text>
                            ) : (
                                <Text type="danger">{addProductState.message}</Text>
                            )}
                           
                           {
                            updateProductState.success ? (
                                <Text type="success">{updateProductState.message}</Text>
                            ) : (
                                <Text type="danger">{updateProductState.message}</Text>
                            )
                            }
                            
                    </Form>
                </Col>
                <Col span= {12}>
                    <div className="col-md-6 my-4">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Upload</span>
                            </div>
                            <div className="custom-file border rounded">
                                <input type="file" className="custom-file-input"
                                onChange={handleUploadInput} multiple accept="image/*" />
                            </div>

                        </div> 
                        <div className="row img-up mx-0">
                            {
                                images.map((img, index) => (
                                    <div key={index} className="file_img my-1">
                                        <img src={img.url ? img.url : URL.createObjectURL(img)}
                                        alt="" className="img-thumbnail rounded" />

                                        <span onClick={() => deleteImage(index)}>X</span>
                                    </div>
                                ))
                            }
                        </div>
                     </div>
                </Col>
            </Row>
        </>
    );
}

function mapStateToProps(state) {
    return {
        addProductState: state.products.addProduct,
        getProductState: state.products.getProduct,
        getCategoriesState: state.categories.list.categories,
        getMaterialState: state.material.list.material,
        token : state.auth.token,
        updateProductState: state.products.updateProduct
    };
}

export default connect(mapStateToProps, { getProduct, addProduct , updateProduct, fetchCategories , fetchMaterial})(AddProduct);
