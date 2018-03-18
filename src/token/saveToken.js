import web3 from './web3';
import * as BLOXAB from './build/BLOXAB.json';

export default new web3.eth.Contract(JSON.parse(BLOXAB.interface), "0x342de2b0B48efC01F81260FF0eb319E11d20f082");

// console.log(instance, web3, 'savetoken.js')
