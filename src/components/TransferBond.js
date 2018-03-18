import React, {Component} from 'react';
import instance from '../token/saveToken';
// import ethereum_address from 'ethereum-address';

import { Row, Card, Col, Input, Button, Select, Form, Icon } from "antd";
const Option = Select.Option;

const FormItem = Form.Item;

class TransferBond extends React.Component {
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
            validSendingAddress: false,
            bondId: ''
        }
    }


    TransferBond = async (e) => {
        const form = this.props.form;

        this.setState({sendTxLoading: true, validSendingAddress: false})
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
            }
        });
        if(form.getFieldValue('addressTo')) {
            console.log(form.getFieldValue('addressTo'), this.state.bondId)
            try {
                const txResp = await instance.methods.transfer(form.getFieldValue('addressTo'), this.state.bondId).send({from: this.props.metaMaskAccount, gas: '1000000'});
                console.log(txResp)
            }
            catch(err) {
                console.log(err)
            }
        }

        this.setState({sendTxLoading: false, validSendingAddress: true});
    }

    handleAddressChange = (value) => {
        console.log(value)
        // this.props.bond.map(function (obj) {
        //     if(obj.add)
        // })
        this.setState({
            bondId: value
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const self = this;
        return (
            <div>
                <Card loading={this.props.loading} title="Transfer Bond">
                    <Form style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center', margin: '10px auto' }} onSubmit={this.TransferBond} className="login-form">
                        <Row style={{ width: '100%', display: 'flex', alignItems: 'center'}}>
                            <Col span={24}>
                                <Select defaultValue="Select an Address to Transfer" onChange={this.handleAddressChange}>
                                    {
                                        this.props.bond.map(function (obj, index) {
                                            return (obj.owner == self.props.metaMaskAccount && <Option key={index} value={index}> <b>ID: </b>{index} &nbsp;&nbsp; <b>Address: </b>{obj.owner}</Option>)
                                        })
                                    }
                                </Select>
                            </Col>
                        </Row>
                        <Row style={{ width: '100%', display: 'flex', alignItems: 'center', margin: '10px auto'}}>

                            <Col span={19}>
                                <FormItem style={{ width: '100%'}}>
                                {getFieldDecorator('addressTo', {
                                    rules: [{ required: true, message: 'Address To is required!' }],
                                    })
                                (
                                    <Input placeholder="Address To" />
                                )}
                                </FormItem>
                            </Col>
                            <Col offset={2} span={3}>
                                <FormItem>
                                    <Button loading={this.state.balanceLoading} type="primary" htmlType="submit" className="login-form-button" style={{ float: 'right'}}>
                                        Transfer
                                    </Button>
                                </FormItem>
                            </Col>
                        </Row>
                        <p><Icon style={{ fontSize: 17, color: '#faad14' }} type="info-circle-o" /> This will allow to transfer only those bonds that have an Owner Address same to your Current MetaMask account</p>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default  Form.create()(TransferBond);