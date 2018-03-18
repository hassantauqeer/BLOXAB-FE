import React, {Component} from 'react';
import instance from '../token/saveToken';
// import ethereum_address from 'ethereum-address';
import web3 from '../token/web3';

import { Row, Card, Col, Input, Select, Button, Form, Icon } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;


class PurchaseBond extends React.Component {
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
            bondId: '',
            bondName: '',
            bondAddress: '',
            sellingPrice: '',
        }
    }

    getInfo = async (e) => {
        this.setState({balanceLoading: true, validBalanceAddress: false})
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
            }
        });
        // console.log(this.state.balanceAddress, "balanceAddress")
        const balance = await instance.methods.balanceOf(this.state.balanceAddress).call();
        this.setState({balance, balanceLoading: false, validBalanceAddress: true});
    }

    handleCheckAddress = (rule, value, callback) => {
        this.setState({balanceAddress: value})
        if (value) {
            // if (value && !ethereum_address.isAddress(value)) {
            //     // console.log('invalid')
            //     this.setState({validBalanceAddress: false})
            //     callback('Invalid Address!')
            // }
            // else {
            //     // console.log('valid', value)
            //     callback()
            //     this.setState({validBalanceAddress: true})
            // }
        }
        else {
            callback()
        }
    }


    handleAddressChange = (value) => {
        const self = this;
        console.log(value)
        this.props.bond.map(function (obj, index) {
            if(index == value) {
                self.setState({bondAddress: obj.owner, sellingPrice: obj.sellingPrice})
            }
        })
        this.setState({
            bondId: value
        })
    }

    purchaseBond = async () => {
        const txResp = await instance.methods.purchase(this.state.bondId).send({from: this.props.metaMaskAccount, gas: '1000000'});
        console.log(txResp)
    }
    render() {
        const self = this;
        return (
            <div>
                <Card loading={this.props.loading} title="Purchase Bond">
                    <Row  style={{ width: '100%', display: 'flex', margin: '10px auto', alignItems: 'center'}}>
                        <Col span={10}>
                            <Select  style={{ width: '100%'}} defaultValue="Select a Bond To Purchase" onChange={this.handleAddressChange}>
                                {
                                    this.props.bond.map(function (obj, index) {
                                        return (obj.owner != self.props.metaMaskAccount && <Option key={index} value={index}>{obj.bondName}</Option>)
                                    })
                                }
                            </Select>
                        </Col>
                        <Col offset={1} span={6}>
                            <Input defaultValue="No Bond Selected" placeholder="Bond ID" value={this.state.bondId} disabled/>
                        </Col>
                        <Col offset={1} span={6}>
                            <Input placeholder="Selling Price" value={this.state.sellingPrice} disabled/>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%', display: 'flex', margin: '10px auto', alignItems: 'center'}}>
                        <Col span={24}>
                            <Input defaultValue="No Bond Selected" placeholder="Bond Address" value={this.state.bondAddress} disabled/>
                        </Col>
                    </Row>

                    <Row style={{ width: '100%', margin: '10px auto'}}>
                        <Col span={24}>
                            <Button style={{ width: '100%', margin: '10px auto'}} type="primary" onClick={this.purchaseBond}>
                                Purchase
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

export default Form.create()(PurchaseBond);