import React,{useState, useEffect} from "react";
import Web3 from "web3";
import { quotes } from "../data";
import moment from 'moment';

export default function Navbar() {

  const connectWallet= async () => {
    await loadWeb3();
    loadBlockchainData();
  };
  const [accountAppearance, setAccountAppearance] = useState()
  const [accountNumber, setAccountNumber] = useState();  

  useEffect(()=>{
    if(accountNumber){
      const showAccount=accountNumber.substr(0,5) +" .... " + accountNumber.substr(accountNumber.length - 5)
      setAccountAppearance(showAccount)
    }
  },[accountNumber])

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    await web3.eth.getAccounts((err, accounts) => setAccountNumber(accounts[0]))     
  };

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non ethereum browser detected. You should consider Metamask!"
      );
    }
  };



  return (
    <header className="bg-gray-800 md:sticky top-0 z-10">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <div className="title-font font-medium text-white mb-4 md:mb-0">
          <a href="#about" className="ml-3 text-xl">
            Yoni Binder
          </a>
        </div>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
          <a href="#projects" className="mr-5 hover:text-white">
            Past Work
          </a>
          <a href="#skills" className="mr-5 hover:text-white">
            Skills
          </a>
          {/* <a href="#testimonials" className="mr-5 hover:text-white">
            Testimonials
          </a> */}
          {accountAppearance && <div style={{textAlign:'center', color:'#34d399', fontSize:'16px', width:'900px', margin:'0 auto'}}
          >
        <span style={{color:'white'}}>Today's quote is:</span> <br/> {quotes[moment().format('dddd')]}
        </div>}
        </nav>
        {!accountAppearance ?
        <input
          // href="#contact"
          className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"
          onClick={connectWallet}
          type="button"
          value="Connect Wallet">
          </input>
        :
        <div style={{fontsize: '12px'}}>{accountAppearance}</div>}      
      </div>
    </header>
  );
}
