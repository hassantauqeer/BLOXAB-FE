import React, {Component} from 'react';
import instance from '../token/saveToken';
import ethereum_address from 'ethereum-address';
import web3 from '../token/web3';

import { Row, Card, Col, Input, Button, Form, Icon } from "antd";
const FormItem = Form.Item;


class SendToken extends React.Component {
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
            sendAddress: '',
            balance: '',
            validBalanceAddress: false,
            validSendingAddress: false
        }
    }


    sendTx = async (e) => {
        const form = this.props.form;

        this.setState({sendTxLoading: true, validSendingAddress: false})
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
            }
        });
        if(form.getFieldValue('value')) {
            console.log(form.getFieldValue('value'))
            console.log(form.getFieldValue('sendingAddress'), web3.utils.toWei(form.getFieldValue('value').toString(), 'ether'))
            try {
                const txResp = await instance.methods.transfer(form.getFieldValue('sendingAddress'), form.getFieldValue('value').toString()).send({from: this.props.metaMaskAccount, gas: '1000000'});
                if(txResp.blockHash) {
                    console.log(txResp, 'loaded')
                }else {
                    console.log(txResp, 'not loaded')
                }
                // const result = instance.events.Transfer(function (err, res) {
                //     console.log(err, res, 'watcher')
                // });
                // console.log(result)

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
            if (value && !ethereum_address.isAddress(value)) {
                callback('Invalid Address!')
                console.log("invalid-add", value)
            }
            else {
                callback()
            }
        }
        else {
            callback()
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card loading={this.props.loading} title="Send Tokens">
                    <Form style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center' }} onSubmit={this.sendTx} className="login-form">
                        <FormItem style={{ width: '100%'}}>
                            {getFieldDecorator('sendingAddress', {
                                rules: [{ required: true, message: 'Address is required!' },
                                    {
                                        validator: this.handleSendAddress
                                    }],
                            })(
                                <Input placeholder="To Address" />
                            )}
                        </FormItem>
                        <Row style={{ width: '100%'}}>
                            <Col span={12}>
                                <FormItem style={{ width: '100%'}}>
                                    {getFieldDecorator('value', {
                                        rules: [{ required: true, message: 'Value is required!' }],
                                    })(
                                        <Input placeholder="Value" type="number" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem>
                                    <Button loading={this.state.balanceLoading} type="primary" htmlType="submit" className="login-form-button" style={{ float: 'right'}}>
                                        Send
                                    </Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create()(SendToken);