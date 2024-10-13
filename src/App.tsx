import {useAccount} from 'wagmi';
import Welcome from './signup/welcome';
import Nav from './mainComponents/nav';
import UnregisteredUser from './signup/unregistered';
import RegisteredUser from './signup/registered';
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import WalletCMP from './mainComponents/walletCMP';
import abi from './mainComponents/abi/abi.json';
import {BrowserRouter, Route,Switch } from 'react-router-dom';
import Notfound from './signup/notfound';
import ca from './signup/ca';
import UserPage from './signup/userPage';
import SharedViewPage from './signup/viewpage';
import CreateNewUser from './signup/createNewUser';
/* interface RouteParams {
  id: string;
} */
function App() {
  const {address,status} = useAccount();
  const [pagefound, setPageFound] = useState(null);
  const userAddrs= window.location.pathname.split("/");
  const baseSep = new Web3("https://base-sepolia-rpc.publicnode.com");
  const contract = new baseSep.eth.Contract(abi, ca);
  const [bool, setBool] = useState(true);
  const [userName, setUserName] = useState("User");
  const [stbool, setstBool] = useState(null);
  const [userNotFound, setUserNotFound]= useState(true);
  const [userId, setUserID]= useState("")
  const [input, setInput] = useState(true)
  /* const currentPage= window.location.pathname.split("/");
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
  if(tr){
    return(
      <div>
        <div>{elem}</div>
      </div>
    )
  } */
 useEffect(
    ()=>{
      if(status=='connected'){
      try{
        contract.methods.checkUser(address).call().then(
          (res)=>{
            //console.log(res);
            //@ts-ignore
            setUserName(res[0].name);
            //@ts-ignore
            setUserID(res[0].uid);
            setUserNotFound(false);
            //@ts-ignore
            setstBool(false);
          }
        ).catch(()=> {
          setUserNotFound(true);
          //@ts-ignore
          setstBool(false);
          setUserName("User");
          console.log("User not found, Check address");
        })
      } catch (err){
        //@ts-ignore
        document.querySelector(".connection-info").style.display="block";
        setTimeout(
          ()=>{
            //@ts-ignore
            document.querySelector(".connection-info").style.display="none";
          }, 4000
        )
      }
    }
    },[status]
  )
  if(userAddrs.length>=3 && (userAddrs[userAddrs.length-1])!=""){
    useEffect(()=>{
    const resFuncUser=async()=>{
      console.log("test")
      try{
        contract.methods.checkUser(userAddrs[userAddrs.length-1]).call().
      then(()=>
        //@ts-ignore 
        setPageFound(true)).catch(()=> setPageFound(false));
      }
      catch(err){
        //@ts-ignore
        setPageFound(false)
      }
    }
    resFuncUser();
  }, [userAddrs])
  if(pagefound){
    console.log("found");
    return(
      <>
      <Nav userName={userName} setUserName={setUserName} />
      <CreateNewUser/>
      <SharedViewPage setUserName={setUserName}/>
      </>
    )
  }
  else if(!pagefound){
    console.log("not found---!")
     return(<>
      <Nav userName={userName} setUserName={setUserName} />
      <CreateNewUser/>
      <div>hereeee222</div>
      <Notfound/>
      </>
     )
    }
  }
  /*
  //------ 0x52c043C7120d7DA35fFdDF6C5c2359d503ceE5F8
    usernotfound will be for the search! yes it will be for the search!
    and uhm yeah... and it will be cool for just a static page 
    which the user will be able to share their link and the link include userAddress    */
  return(
    <>
      <BrowserRouter basename='/on-pow'>
        <Nav userName={userName} setUserName={setUserName} />
        {/* 
        
        {(!pagefound)&& <div>not found</div>}
        {(pagefound) && <SharedViewPage/>}
        
         */}
        <Switch>
        <Route exact path="/">
        {status ==='connecting' && <div className='contingMesage'>Connecting</div>}
        {status ==='connected'&&<WalletCMP/>}
        {status==='disconnected'&&<Welcome/>}
        <div className='connection-info'>Bad Internetconnection</div>
        {(userNotFound&&(status==='connected' && bool)) && <UnregisteredUser userName={userName} setUserName={setUserName} setstBool={setstBool} setBool={setBool}/>}
        {userNotFound&&(status==='connected'&& stbool) && <RegisteredUser userName={userName} setUserName={setUserName} userNotFound={userNotFound} 
        setUserNotFound={setUserNotFound} setstBool={setstBool} input={input} setInput={setInput}/>
        }
        {status==='connected'&&( !stbool && !userNotFound) && <UserPage setUserNotFound={setUserNotFound} userNotFound={userNotFound} userId={userId} 
        setUserID={setUserID} setstBool={setstBool} setBool={setBool} input={input} setInput={setInput}/>}
        </Route>
        {/* <Route exact path="/:id">
          <div>
            {pagefound && <div>page found!</div>}
            {!pagefound && <div>heheh, page not found</div>}
          </div>
        </Route> */} 
        <Route path="*">
          <Notfound/>
          <div>catches all error</div>
        </Route>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
