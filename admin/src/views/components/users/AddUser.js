import React, { useState, useEffect } from "react";
import { Form, Row, Col, Input, Button, Typography, Select } from "antd";
import { useFormInput } from "../../../utils/hooks";
import { connect } from "react-redux";
import { addUser, getUser } from "../../../actions/users";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

const { Text } = Typography;
const { Option } = Select
function AddUser({ addUser, addUserState, getUser, getUserState , token}) {
    const [id, setId] = useFormInput("");
    const [name, setName] = useFormInput("");
    const [email, setEmail] = useFormInput("");
    const [password, setPassword] = useFormInput("");
    const [cf_password, setCfpassword] = useFormInput("");
    const [roleName, setroleName] = useState("user");
    const [avatar, setAvatar] = useFormInput("");

    const params = useParams();

    useEffect(() => {
        console.log("params: ", params);
        if (params.id) {
            getUser(params.id);
        }
    }, []);

    useEffect(() => {
        console.log('getUserState',getUserState);
        if (params.id) { //them
            if (getUserState.success) {
                let { user } = getUserState;
                setId({ target: { value: user._id } });
                setName({ target: { value: user.name } });
                setroleName(user.role);
                setEmail({ target: { value: user.email } });
                setAvatar({ target: { value: user.avatar } });
            }
        }
    }, [getUserState.success]);

    const submit = () => {
        if (params.id) {
            // create update user actions, create api, tao reducer
            // updateUser({

            // });
        } else {
            addUser({
                name : name,
                email : email,
                password : password,
                cf_password : cf_password,
                role : roleName,
            });
        }
        console.log(`Id: ${id}, name: ${name}, roleName: ${roleName}`);
    };

    return (
        <>
            <h3>{params.id ? "Update user" : "Add user"}</h3>
            <Form>
                { params.id ? <Row style={{ margin: "10px" }}>
                    <Col span={4}>ID</Col>
                    <Col span={8}>
                        <Input value={id} onChange={setId}></Input>
                    </Col>
                </Row> : ''
                }
                
                <Row style={{ margin: "10px" }}>
                    <Col span={4}>Name</Col>
                    <Col span={8}>
                        <Input value={name} onChange={setName}></Input>
                    </Col>
                </Row>
                <Row style={{ margin: "10px" }}>
                    <Col span={4}>Role</Col>
                    <Col span={16}>
                                    <Select
                                        showSearch
                                        style={{ width: 300 }}
                                        placeholder="Select a role"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        value={roleName}
                                        onChange={value => setroleName(value)}
                                        defaultValue = 'user'
                                    >
                                            <Option value='user'>User</Option>
                                            { jwt_decode(token).root ? <Option value='admin' >Admin</Option> : '' }
                                    </Select>
                    </Col>
                </Row>
                <Row style={{ margin: "10px" }}>
                    <Col span={4}>Email</Col>
                    <Col span={16}>
                        <Input
                            value={email}
                            onChange={setEmail}
                        ></Input>
                    </Col>
                </Row>
                {
                    params.id ? '' : (
                        <>
                            <Row style={{ margin: "10px" }}>
                                <Col span={4}>Password</Col>
                                <Col span={10}>
                                    <Input
                                        value={password}
                                        onChange={setPassword}
                                    ></Input>
                                </Col>
                            </Row>
                            <Row style={{ margin: "10px" }}>
                                <Col span={4}>Comfirm password</Col>
                                <Col span={10}>
                                    <Input
                                        value={cf_password}
                                        onChange={setCfpassword}
                                    ></Input>
                                </Col>
                            </Row>
                        </>
                    ) 

                }
                
                <Row style={{ margin: "10px" }}>
                    <Col span={4}>Avatar</Col>
                    <Col span={16}>
                        <Input
                            value={avatar}
                            onChange={setAvatar}
                        ></Input>
                    </Col>
                </Row>
            </Form>
            <Button loading={addUserState.loading} onClick={submit}>
                Submit
            </Button>
            {addUserState.success ? (
                <Text type="success">{addUserState.message}</Text>
            ) : (
                <Text type="danger">{addUserState.message}</Text>
            )}
        </>
    );
}

function mapStateToProps(state) {
    return {
        addUserState: state.users.addUser,
        getUserState: state.users.getUser,
        token : state.auth.token
    };
}

export default connect(mapStateToProps, { addUser, getUser })(AddUser);
