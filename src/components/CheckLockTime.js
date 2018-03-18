import React, {Component} from 'react';
import instance from '../token/saveToken';
// import ethereum_address from 'ethereum-address';

import { Row, Card, Col, Input, Button, Form, Icon } from "antd";
const FormItem = Form.Item;

class CheckLockTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            name: '',
            symbol: '',
            owner: '',
            metaMaskAccount: '',
            contractAddress: '',
            totalSupply: '',
            balanceLoading: false,
            sendTxLoading: false,
            balanceAddress: '',
            currentTime: '',
            sendAddress: '',
            balance: '',
            date: '',
            validBalanceAddress: false,
            validSendingAddress: false
        }
    }


    checkTime = async (e) => {
        const form = this.props.form;

        this.setState({sendTxLoading: true, validSendingAddress: false})
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
            }
        });
        if(form.getFieldValue('address')) {
            console.log(form.getFieldValue('address'))
            try {
                const txResp = await instance.methods.lastTxTime(form.getFieldValue('address')).call();
                var date = new Date(txResp*1000);
                console.log(typeof  date.toString())
                this.setState({date: date.toString()})
            }
            catch(err) {
                console.log(err)
            }
        }
        this.setState({sendTxLoading: false, validSendingAddress: true});
    }
    handleSendAddress = (rule, value, callback) => {
        this.setState({sendAddress: value})
        if (value) {
            // if (value && !ethereum_address.isAddress(value)) {
            //     callback('Invalid Address!')
            //     console.log("invalid-add", value)
            // }
            // else {
            //     callback()
            // }
        }
        else {
            callback()
        }
    }
    getCurrentTime = async () => {
        console.log("abc")
        const currentTime = new Date();
        console.log(currentTime)
        this.setState({
            currentTime: currentTime.toString()
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card loading={this.props.loading} title="Lock Time">
                    <Form style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center' }} onSubmit={this.checkTime} className="login-form">
                        <Row style={{ width: '100%', display: 'flex', alignItems: 'center'}}>
                            <Col span={18} style={{display: 'flex', justifyContent: 'center'}}>
                                <FormItem>
                                    { this.state.currentTime && <p><b>Time: </b>{this.state.currentTime}</p>}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem>
                                    <Button loading={this.state.balanceLoading} type="primary" onClick={this.getCurrentTime} className="login-form-button" style={{ float: 'right'}}>
                                        Current Time
                                    </Button>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row style={{ width: '100%', display: 'flex', alignItems: 'center'}}>
                            <Col span={18}>
                                <FormItem style={{ width: '100%'}}>
                                    {getFieldDecorator('address', {
                                        rules: [{ required: true, message: 'Address is required!' },
                                            {
                                                validator: this.handleSendAddress
                                            }],
                                    })(
                                        <Input min={1} placeholder="Enter Address" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem>
                                    <Button loading={this.state.balanceLoading} type="primary" htmlType="submit" className="login-form-button" style={{ float: 'right'}}>
                                        Check
                                    </Button>
                                </FormItem>
                            </Col>
                        </Row>
                        {this.state.date && <p><b>Lock Time:</b><Icon style={{ fontSize: 17, color: '#faad14' }} type="lock" /> {this.state.date}</p>}
                    </Form>
                </Card>
            </div>
        )
    }
}

export default  Form.create()(CheckLockTime);