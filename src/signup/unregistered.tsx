import {useState} from 'react'
import WalletDisconnect from "./walletDisconnect";
import { useAccount } from "wagmi";
import Web3 from 'web3';
import abi from '../mainComponents/abi/abi.json';

//@ts-ignore
export default function UnregisteredUser({userName, setUserName, setstBool, setBool}){
  const {address,status} = useAccount()
  //const [web3, setWeb3] = useState(new Web3);
  function onchangeName(){
    
  }
  function contnFunc(){
    //@ts-ignore
    const val= document.querySelector("#name-in-eth").value;
    const wordVerf= val.slice(val.length-9)
    const userMn= val.slice(0,val.length-9)
    if(wordVerf==".base.eth"){
      console.log("typeshit type---script typeshit typescript typeyeat! heheh");
      setUserName(userMn);
      //document.querySelector(".unreg-user").style.display="none";
      setstBool(true);
      setBool(false);
    }
    else{
      //@ts-ignore
      document.querySelector(".view-only-wrong").style.display="block";
      setTimeout(
        ()=>{
          //@ts-ignore
          document.querySelector(".view-only-wrong").style.display="none";
        }, 5000
      )
    }
    
    //console.log(wordVerf);
  }
  const verifyUser = async () => {
    const baseSep = new Web3("https://base-sepolia-rpc.publicnode.com")
    if (status === 'connected') {
      console.log(address)
      const ca = '0xe5111d714F2135A28acF35714dFF6a9ba4E70cbe';
      const contract = new baseSep.eth.Contract(abi, ca);
      try{
      await contract.methods.checkUser(address).call().then(
        (res)=> console.log(res));
      }
      catch(err){
        console.log(err);
      }
    }
}
  return (
    <div className='unreg-user'>
      <div className='add-user'>
            <div className='sub-sign'>
                <div id='name-text'>Enter name to continue -&gt;</div>
                <div><input id="name-in-eth" type='text' placeholder='e.g. Joe' onChange={onchangeName}/></div>
                <div className="view-only-wrong">base name only!!!</div>
                <div id='continue-ton'>
                  <div onClick={contnFunc}>Continue</div>
                </div>
            </div>
          </div>
    </div>
  )
}
