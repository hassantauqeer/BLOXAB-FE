import React, { Component } from 'react';
import './css/App.css';
import web3 from './token/web3';
import "antd/dist/antd.min.css";
import "antd/lib/icon/style/css";
import instance from './token/saveToken';
import * as BLOXAB from './token/build/BLOXAB.json';
import ethereum_address from 'ethereum-address';

// import SendToken from "./components/SendToken";
import PurchaseBond from "./components/PurchaseBond";
import CreateBond from "./components/CreateBond";
import TransferBond from "./components/TransferBond";
import AllBonds from "./components/AllBonds";
// import CheckLockTime from "./components/CheckLockTime";
// import Loader from "./components/Loader";
// const Tx = require('ethereumjs-tx');
// import Tx from 'ethereumjs-tx';

import { Row, List, Card, Col, Input, Button, Form, Icon, Tabs } from "antd";
const FormItem = Form.Item;
const { TabPane } = Tabs;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dummyAccounts: ["0x19b5ef852a02a1148ca1121266952cdd28cb954f", "0x3ea8d1f331d33323820d6b3584fc93cd8b8e7a1c", "0x4e54a5bec32d6c81aeaed50ccf16876df4393b9f", "0x8d3769698242bfc589aab41617d492900c46beea", "0x367636fab14e8642c5e4b23c0254e584a80a6583", "0x2c30bb87fd7e4808b0d80a8253d208846a243122", "0x2b5634c42055806a59e9107ed44d43c426e58258", "0xa5f8fc0921880cb7342368bd128eb8050442b1a1", "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be", "0x71cc2c9e0e6295fc8a12284da4633c32388eb1be", "0x801555f9e817f2c469fad967e8e51dea67fe649d", "0x03747f06215b44e498831da019b27f53e483599f", "0xa4a61155a8eb14eef1545a540e07c67c796beebb"],
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
            bond: [{
                bondContracts: [],
                bondName: '',
                sellingPrice: '',
                owner: '',
                bondRating: ''
            }]
        }
    }
    async componentDidMount(){
        var self = this;
        setTimeout(function () {
            self.setState({loading: false});
        }, 1500)
        console.log(JSON.parse(BLOXAB.interface));
        const accounts = await web3.eth.getAccounts();
        const contractAddress = await instance._address;
        const name = await instance.methods.name().call();
        const owner = await instance.methods.ceoAddress().call();
        const symbol = await instance.methods.symbol().call();
        const totalSupply = await instance.methods.totalSupply().call();
        const metaMaskAccountBalance = await instance.methods.balanceOf(accounts[0]).call();

        this.setState({
            symbol, name,contractAddress, owner, metaMaskAccount: accounts[0], metaMaskAccountBalance, totalSupply
        })
        var bond = [{
            bondContracts: [],
            bondName: '',
            sellingPrice: '',
            owner: '',
            bondRating: ''
        }]
        var self = this;

        for (var i=0; i<parseInt(totalSupply); i++) {
            bond[i] = await instance.methods.getPerson(i).call();
            // console.log(bond)
            if( i+1 == parseInt(totalSupply)) {
                this.setState({bond})
            }
        }


        // console.log(accounts, instance)
        // console.log(name, symbol)
        // console.log(totalSupply)

//
//         var subscription = await web3.eth.subscribe('logs', {
//             address: this.state.owner,
//         }, function (err, result) {
//             console.log(err, result)
// // callback code here
//         })
//         console.log(subscription)


        // var privateKey = new Buffer('183883908c2d47a5d99f47380115177cee6ac048568eb60f0bc7acc69a8cbed3', 'hex')
        //
        // var rawTx = {
        //     nonce: '0x00',
        //     gasPrice: '0x09184e72a000',
        //     gasLimit: '0x2710',
        //     to: '0x87703192d36A818FeB8fD334D1b593f358f0724C',
        //     value: '0x00',
        //     data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057'
        // }
        //
        // var tx = new Tx(rawTx);
        // tx.sign(privateKey);
        //
        // var serializedTx = tx.serialize().toString('hex');
        // console.log(serializedTx)
        //
        // const res = await web3.eth.sendSignedTransaction('0x' + serializedTx, function(err, hash) {
        //     if (!err)
        //         console.log(hash); // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"
        // });
        // console.log(res)
        // const rec = await web3.eth.getTransactionReceipt('0x628c85cb87b09d3e8cc1e29e7338aad8804d74a56ec65e0f9667802021370a56');
    }
    self = this;

    handleAddressCopy = (address) => {
        // document.execCommand("copy");

        // address.select();
        // document.execCommand("Copy");

        // console.log(clipboard)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
      <div className="App">
          {/*{this.state.loading && <Loader/>}*/}
          {
              <div className="container">
                  <Card loading={this.state.loading} title={this.state.name + " (" + this.state.symbol + ")"} style={{ width: '100%' }}>
                      <Row >
                          <Col span={6} style={{ marginLeft: '-12px'  }}><b>Name: </b>{this.state.name}</Col>
                          <Col span={6} ><b>Symbol: </b>{this.state.symbol}</Col>
                          <Col span={6} style={{ marginLeft: '-3px'  }}><b>Total Bonds: </b>{this.state.totalSupply}</Col>
                      </Row>
                      <Row style={{ margin: '15px auto'}}>
                          {/*<Col span={12}><b>Contract Address: </b><a target="_blank" href={"https://rinkeby.etherscan.io/address/" + this.state.contractAddress}>{this.state.contractAddress}</a></Col>*/}
                          {/*<Col span={12}><b>Owner Address: </b><a target="_blank" href={"https://rinkeby.etherscan.io/address/" + this.state.owner}>{this.state.owner}</a></Col>*/}
                          <Col span={12}><b>Contract Address: </b>{this.state.contractAddress}</Col>
                          <Col span={12}><b>Owner Address: </b>{this.state.owner}</Col>
                      </Row>
                      <Row>
                          {/*<Col span={12}><b>Current MetaMask Account: </b><a target="_blank" href={"https://rinkeby.etherscan.io/address/" + this.state.metaMaskAccount}>{this.state.metaMaskAccount}</a></Col>*/}
                          <Col span={12}><b>Current MetaMask Account: </b>{this.state.metaMaskAccount}</Col>
                          <Col span={4}><b>Account Balance: </b> {this.state.metaMaskAccountBalance} {this.state.symbol}</Col>
                      </Row>
                  </Card>

                  <Tabs defaultActiveKey="3" size="default">
                      <TabPane tab="All Bonds" key="1">
                          <AllBonds {...this.state}/>
                      </TabPane>

                      <TabPane tab="Bond Creation" key="2">
                          <Row style={{ marginTop: '20px' }}>
                              <Col span={9}>
                                  <Card loading={this.state.loading} title="Dummy Addresses" style={{ height: 400, overflow: 'scroll' }}>
                                      <List
                                          dataSource={this.state.dummyAccounts}
                                          renderItem={item => (
                                              <List.Item key={item} data-clipboard-text={item} onClick={(evt) => this.handleAddressCopy(item)}>
                                                  <List.Item.Meta
                                                      // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                      // title={<a href="https://ant.design">{item.name.last}</a>}
                                                      description={item}
                                                  />
                                              </List.Item>
                                          )}
                                      >
                                          {/*{this.state.loading && this.state.hasMore && <Spin className="demo-loading" />}*/}
                                      </List>
                                  </Card>



                              </Col>
                              <Col offset={2} span={13}>
                                  <CreateBond {...this.state}/>
                                  {/*<SendToken {...this.state}/>*/}
                              </Col>
                          </Row>
                          <Row style={{ marginTop: '20px' }}>
                              <Col span={11}>

                                  {/*<Card loading={this.state.loading} title="Create a Contract" style={{ height: 400, overflow: 'scroll' }}>*/}

                                  {/*</Card>*/}
                              </Col>
                          </Row>
                      </TabPane>

                      <TabPane tab="Bond Operations" key="3">
                          <Row style={{ marginTop: '20px' }}>
                              <Col span={11}>
                                  <TransferBond {...this.state}/>
                              </Col>
                              <Col offset={2} span={11}>
                                  <PurchaseBond {...this.state}/>
                                  {/*<CheckLockTime {...this.state}/>*/}
                              </Col>
                              {/*<Col offset={2} span={11}>*/}
                              {/*<LockAccount {...this.state}/>*/}
                              {/*</Col>*/}
                          </Row>
                      </TabPane>
                  </Tabs>




              </div>
          }
      </div>
    );
  }
}

export default Form.create()(App);
