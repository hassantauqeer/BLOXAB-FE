import React, {Component} from 'react';
import instance from '../token/saveToken';
// import ethereum_address from 'ethereum-address';
import web3 from '../token/web3';

import { Row, Card, Col, Input, Button, Form, Icon } from "antd";
const FormItem = Form.Item;

class CreateBond extends React.Component {
    constructor(props) {
        super(props);
        this.bondsAddress = ['aa', 'bb'];
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
            bondsAddress: ['0x19b5ef852a02a1148ca1121266952cdd28cb954f', '0x3ea8d1f331d33323820d6b3584fc93cd8b8e7a1c'],
            bondAddress: '',
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
        if(form.getFieldValue('sendingAddress')) {
        console.log(form.getFieldValue('sendingAddress'))
            try {
                const txResp = await instance.methods.transferOwner(form.getFieldValue('sendingAddress')).send({from: this.props.owner, gas: '1000000'});
                console.log(txResp)
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

    // componentDidUpdate(_, prevState) {
    //     // prevState is the state the component transitioned from
    //     console.log(this.state.count) // current state
    // }

    shouldComponentUpdate(_, nextState) {
        // nextState is the state the component transition to
        return true;
    }
    addBondAddress = () => {
        const form = this.props.form;
        var newArray = this.state.bondsAddress.concat(this.state.bondAddress);
        console.log(newArray)
        this.setState({
            bondsAddress: newArray
        })
    }
    onChangeBondAddress = (evt) => {
        this.setState({bondAddress: evt.target.value})
    }
    removeBondAddress = (evt) => {
        // bondAddresses
        console.log(evt.target)
        evt.persist();
        console.log("js")
        var newArray = this.state.bondsAddress.slice(0, parseInt(evt.target.id)).concat(this.state.bondsAddress.slice(parseInt(evt.target.id)+1));
        console.log(newArray)
        this.setState((prevState) => {
            return {bondsAddress: prevState.bondsAddress.slice(0, parseInt(evt.target.id)).concat(prevState.bondsAddress.slice(parseInt(evt.target.id)+1))}
        })
        // this.setState({
        //     bondsAddress: newArray
        // })
        // this.setState({
        //     bondsAddress: newArray
        // })
        console.log(this.state.bondsAddress)
    }
    createBond = async () => {
        const form = this.props.form;
        console.log(instance.methods)
        const res = instance.methods.createBond(form.getFieldValue('owner'), this.state.bondsAddress, form.getFieldValue('rating'), form.getFieldValue('name'), form.getFieldValue('price')).send({from: this.props.metaMaskAccount, gas: '1000000'});
        console.log(res)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const self = this;
        return (
            <div>
                <Card loading={this.props.loading} title="Create Bond">
                    {this.props.metaMaskAccount == this.props.owner && <Form style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center' }} onSubmit={this.sendTx} className="login-form">
                        <Row style={{ width: '100%', display: 'flex', alignItems: 'center'}}>
                            <Col span={18}>
                                <FormItem style={{ width: '100%'}}>
                                    {getFieldDecorator('owner', {
                                        rules: [{ required: true, message: 'Address is required!' },
                                            {
                                                validator: this.handleSendAddress
                                            }],
                                    })(
                                        <Input initialvalue="0x4e54a5bec32d6c81aeaed50ccf16876df4393b9f" placeholder="Owner Address" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row style={{ width: '100%', display: 'flex', alignItems: 'flexStart'}}>
                            <Col span={18}>
                                <Input placeholder="Add Bond Address" value={this.state.bondAddress} onChange={this.onChangeBondAddress}/>
                            </Col>
                            <Col span={6}>
                                <FormItem>
                                    <Button type="primary" onClick={this.addBondAddress} className="login-form-button" style={{ float: 'right'}}>
                                        Add Address
                                    </Button>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row  style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'spaceBetween', alignItems: 'flexStart'}}>
                            {
                                this.state.bondsAddress.map(function (add, index) {
                                    return(
                                        <div style={{display: 'flex', justifyContent: 'spaceBetween', marginBottom: 5, marginTop: 5}} key={index}>
                                            <Col span={18}><Input disabled value={add} id={index}/></Col>
                                            <Col offset={1} span={5} style={{display: 'flex', justifyContent: 'spaceBetween'}}>
                                                <Button type="danger" id={index} onClick={self.removeBondAddress}>
                                                    <Icon type="close-circle-o" />
                                                </Button>
                                            </Col>
                                        </div>
                                    )
                                })
                            }
                        </Row>

                        <Row style={{ width: '100%', display: 'flex', alignItems: 'center'}}>
                            <Col span={12}>
                                <FormItem style={{ width: '100%'}}>
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: 'Name is required!' }],
                                    })(
                                        <Input initialvalue="First Bond" placeholder="Name" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row style={{ width: '100%', display: 'flex', alignItems: 'center'}}>
                            <Col span={11}>
                                <FormItem style={{ width: '100%'}}>
                                    {getFieldDecorator('rating', {
                                        rules: [{ required: true, message: 'Rating is required!' }],
                                    })(
                                        <Input initialvalue={5} type="number" placeholder="Rating" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col offset={2} span={11}>
                                <FormItem>
                                    {getFieldDecorator('price', {
                                        rules: [{ required: true, message: 'Price is required!' }],
                                    })(
                                        <Input initialvalue={10000} type="number" placeholder="Price" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Button style={{width: '100%'}} onClick={this.createBond} type="primary">Create Bond</Button>
                            </Col>
                        </Row>

                    </Form>}
                    { this.props.metaMaskAccount != this.props.owner &&
                    <p><Icon style={{ fontSize: 17, color: '#f5222d' }} type="lock" />Only an owner can change Owner. Change you address to Owner Address to access this.</p>
                    }
                </Card>
            </div>
        )
    }
}

export default Form.create()(CreateBond);