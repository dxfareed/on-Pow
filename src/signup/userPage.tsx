//import {useParam} from "react-router-dom"
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import  Web3 from 'web3';
import ca from './ca'
import abi from '../mainComponents/abi/abi.json'
export default function UserPage({userNotFound, setstBool, setUserNotFound, setBool}) {
  const [view, setView] = useState(null);
  const web3= new Web3("https://sepolia.base.org");
  const {address,status} = useAccount()
  const contract= new web3.eth.Contract(abi, ca);
  useEffect( ()=>{
    contract.methods.checkUser(address).call().then(
      (res) =>{
      console.log(res)
      const viewpage= 
          <ol>
          {res.map(
            (data)=>(
              <li className='sub-list-each'>
                <div className='Topic-sub'>{data.topic}</div>
                <div className='Link-sub'><a href={data.link} target='_blank'>{data.link}</a></div>
              </li>
            )
          )}
          </ol>
      setView(viewpage);
      //setViewBool(true);
    }
  ).catch((err)=>{
    document.querySelector(".connection-info").style.display="block";
    setTimeout(
      ()=>{
        document.querySelector(".connection-info").style.display="none";
      }, 4000
    )
      })

  },[userNotFound])
  const updateFunc=()=>{
      setstBool(true)
      setUserNotFound(true)
      setBool(false)
  }
  const DeleteFunc = async()=>{
    await contract.methods.addList(address).send(
      {from : address}).then(
    (res)=> console.log(res))
    .catch((err)=> console.log(err));

  }
  return (
    <>
    <div className='main-user-view'>
      <div>
            <ol>
              {view}
            </ol>
      </div>
    </div>
    <div className="update-list">
        <div onClick={DeleteFunc}>
          text with me
        </div> 
    </div>
    </>
  )
}
