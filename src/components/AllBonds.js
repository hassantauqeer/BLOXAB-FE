import React, {Component} from 'react';
import instance from '../token/saveToken';
import ethereum_address from 'ethereum-address';

import { Row, Card, Col, Input, Button, Form, Icon } from "antd";
const FormItem = Form.Item;

class AllBonds extends React.Component {
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
            validSendingAddress: false,
            bond: [{
                bondContracts: [],
                bondName: '',
                sellingPrice: '',
                owner: '',
                bondRating: ''
            }]
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
    getCurrentTime = async () => {
        console.log("abc")
        const currentTime = new Date();
        console.log(currentTime)
        this.setState({
            currentTime: currentTime.toString()
        })
    }
    async componentDidMount () {
        // const totalSupply = await instance.methods.totalSupply().call();
        // instance.methods.totalSupply().call().then(function (resp) {
        //     var totalSupply = parseInt(resp)
            // console.log("this.props.totalSupply", totalSupply)
            // const totalSupply = parseInt(this.props.totalSupply);
            // for (var i=0; i<totalSupply; i++) {
            //     instance.methods.getPerson(i).call().then(function (res) {
            //         // bond[i].bondContracts = res.bondContracts;
            //         // bond[i].bondName = res.bondName;
            //         // bond[i].sellingPrice = res.sellingPrice;
            //         // bond[i].owner = res.owner;
            //         // bond[i].bondRating = res.bondRating;
            //         console.log(res)
            //         // console.log(bond)
            //         // if(i+1 == totalSupply) {
            //         //     self.setState({
            //         //         bond
            //         //     })
            //         // }
            //     })
            // }
        // });
        var bond = [{
            bondContracts: [],
            bondName: '',
            sellingPrice: '',
            owner: '',
            bondRating: ''
        }]
        var self = this;
        // console.log("this.props.totalSupply", parseInt(totalSupply))
        // // const totalSupply = parseInt(this.props.totalSupply);
        // for (var i=0; i<parseInt(totalSupply); i++) {
        //     instance.methods.getPerson(i).call().then(function (res) {
        //         bond[i].bondContracts = res.bondContracts;
        //         bond[i].bondName = res.bondName;
        //         bond[i].sellingPrice = res.sellingPrice;
        //         bond[i].owner = res.owner;
        //         bond[i].bondRating = res.bondRating;
        //         // console.log(res)
        //         console.log(bond)
        //         if(i+1 == parseInt(totalSupply)) {
        //             self.setState({
        //                 bond
        //             })
        //         }
        //     })
        // }
    }
    render() {
        console.log(this.props.bond)
        const self = this;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                {
                this.props.bond.map(function (obj, index) {
                    return (
                        <Col key={index} span={12}>
                            <Card style={{margin: 10}} loading={self.props.loading} title={obj.bondName}>
                                <p style={{textAlign: 'left'}}><b>ID: </b>{index}</p>
                                <p style={{textAlign: 'left'}}><b>Owner: </b>{obj.owner}</p>
                                <p style={{textAlign: 'left'}}><b>Price: </b>{obj.sellingPrice}</p>
                                <p style={{textAlign: 'left'}}><b>Rating: </b>{obj.bondRating}</p>
                                <p style={{textAlign: 'left'}}><b>Bond Addresses</b></p>
                                {
                                    obj.bondContracts.map(function (arr) {
                                        return (<p  style={{textAlign: 'left'}} key={arr}>{arr}</p>)
                                    })
                                }
                            </Card>
                        </Col>
                    )
                })
                }
            </div>
        )
    }
}

export default  Form.create()(AllBonds);