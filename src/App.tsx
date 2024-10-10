import { useAccount, useConnect, useDisconnect } from 'wagmi'
import Welcome from './signup/welcome'
import Nav from './mainComponents/nav'
import UnregisteredUser from './signup/unregistered'
import RegisteredUser from './signup/registered'
import { useState, useEffect } from 'react'
import Web3 from 'web3'
import WalletCMP from './mainComponents/walletCMP'
import abi from './mainComponents/abi/abi.json'
import { useParams,BrowserRouter, Route,Switch } from 'react-router-dom'
import Notfound from './signup/notfound'
import ca from './signup/ca'
function App() {
  const {address,status} = useAccount()
  const baseSep = new Web3("https://base-sepolia-rpc.publicnode.com")
  const [tr, setTr] = useState(false);
  const [bool, setBool] = useState(true);
  //const ca = '0x437D1922fc891B15a1b8ad43Fb8b9C3dB308AE2d';
  const contract = new baseSep.eth.Contract(abi, ca);
  const [userName, setUserName] = useState("User");
  const [elem, setElem]=useState(null);
  const [stbool, setstBool] = useState(false);
  const currentPage= window.location.pathname.split("/");
  if(currentPage.length>4){
    return(
      <Notfound/>
    )
  }
  else if(currentPage.length==3|| currentPage.length==3){
  const val1addrs=currentPage[currentPage.length-2];
  const val1addrsId=currentPage[currentPage.length-1];
  const checkId = async()=>{
    try {
      await contract.methods.userPageReturn(val1addrs, val1addrsId).call().then((res) =>{
          //console.log(res)
          const viewpage= res.map(
            (data)=>(
              <div className='sub-list-each'>
                <div className='Topic-sub'>{data.topic}</div>
                <div className='Link-sub'><a href={data.link} target='_blank'>{data.link}</a></div>
              </div>
            )
          )
          setElem(viewpage);
          setTr(true)
        }
      )
    }
    catch(err){
      console.log(err)
    }
  }
  checkId();
}
  console.log(currentPage)
  if(tr){
    return(
      <div>
        <div>{elem}</div>
      </div>
    )
  }
 useEffect(
    ()=>{
      if(status=='connected'){
      try{
        contract.methods.checkUser(address).call().then(
          (res)=>{
            console.log(res);
          }
        ).catch((err)=> {
          console.log("User not found, Check address")
        })
      } catch (err){
        console.log("Connection error")
      }
    }
    },[status]
  )
  //test();
  //verifyUser();
  return(
    <>
    
        <Nav userName={userName} setUserName={setUserName} />
       
        {status ==='connecting' && <div className='contingMesage'>Connecting</div>}
        {status ==='connected'&&<WalletCMP/>}
        {status==='disconnected'&&<Welcome/>}
        {(status==='connected' && bool) && <UnregisteredUser userName={userName} setUserName={setUserName} setstBool={setstBool} setBool={setBool}/>}
        { (status==='connected' && stbool) && <RegisteredUser userName={userName} setUserName={setUserName}/>}
     
       {/* <Route exact path="/:id">
          <div>hello world</div>
        </Route>*/}
      
    </>
  )

  /*return (
   <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  )*/
}

export default App
