import web3 from './web3';
import BLOXAB from './build/BLOXAB.json';

const instance = new web3.eth.Contract(
  JSON.parse(BLOXAB.interface),
  '0x342de2b0B48efC01F81260FF0eb319E11d20f082'
);

export default instance;
