import { useAccount, useConnect, useDisconnect } from 'wagmi'
import Welcome from './signup/welcome'
import Nav from './mainComponents/nav'
import UnregisteredUser from './signup/unregistered'
import RegisteredUser from './signup/registered'
import { useState, useEffect } from 'react'
import Web3 from 'web3'
import WalletCMP from './mainComponents/walletCMP'
import WalletDisconnect from './signup/walletDisconnect'
import abi from './mainComponents/abi/abi.json'

function App() {
  const {address,status} = useAccount()
  const baseSep = new Web3("https://base-sepolia-rpc.publicnode.com")
  //const [web3, setWeb3] = useState(new Web3);
  const [bool, setBool] = useState(true);
  //const { connectors, connect, error } = useConnect()
 // const { disconnect } = useDisconnect()
  const [userName, setUserName] = useState("User");
  const [stbool, setstBool] = useState(false);
  const test = async ()=>{
    if (status === 'connected') {
        /* const provider = window.ethereum;
        setWeb3(new Web3(provider)); */  
        const ca = '0x1545999E36fFf3a65D30001dEd7BeCFf602B1f97';
        const contract = new baseSep.eth.Contract(abi, ca);
        console.log("test with - in")
        try {
            await contract.methods.checkUser(address).call().then(
              (res) => {
                setBool(false);
                setstBool(true);
                console.log(res);
              })
        } catch (err) {
            console.error('Error occurred:', err);
        }
    }
  }
  test();
  //verifyUser();
  return(
    <>
      <Nav userName={userName} setUserName={setUserName} />
      {status ==='connecting' && <div className='contingMesage'>Connecting</div>}
      {status ==='connected'&&<WalletCMP/>}
      {status==='disconnected'&&<Welcome/>}
      {(status==='connected' && bool) && <UnregisteredUser userName={userName} setUserName={setUserName}/>}
      { (status==='connected' && stbool) && <RegisteredUser userName={userName} setUserName={setUserName}/>}
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
