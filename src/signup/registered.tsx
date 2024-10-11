//import React from 'react'
import abi from '../mainComponents/abi/abi.json'
import Web3 from "web3";
import { useAccount } from "wagmi";
import { useEffect, useState } from 'react';
import randomGenString from './genId';
import ca from './ca'
export default function RegisteredUser({userName, userNotFound,setUserNotFound,setstBool,input,setInput}){
    const {chainId}=useAccount();
    const arraytest=[];
    const valId=randomGenString();
    const [viewone, setViewOne]= useState(true);
    const [bool, setBool] = useState(false);
    const [view, setView] = useState(null);
    const [viewbool, setViewBool]= useState(false);
    const {address,status} = useAccount();
    //const [userId, setUserID]= useState("")
    // [i, setI]= useState(true);

    async function submitit(){
        const topiclen=document.getElementsByClassName("topic").length;
        for(var i=0; i<topiclen; i++){
            if( document.getElementsByClassName("topic")[i].value !== "" && document.getElementsByClassName("link")[i].value !== "" ){
            arraytest.push({
                name:userName,
                topic:document.getElementsByClassName("topic")[i].value,
                link: document.getElementsByClassName("link")[i].value,
                uid:valId
                });
            }
        }
        console.log(arraytest)
        for (var i=0; i< arraytest.length; i++){
            if( (arraytest[i].topic!==""||arraytest[i].topic!>=""*2) && (arraytest[i].link!=="" || arraytest[i].link!>=""*2)){
                setBool(true);
            }
            else{
                setBool(false);
                document.querySelector(".input-warn").style.display="block";
                setTimeout(
                  ()=>{
                    document.querySelector(".input-warn").style.display="none";
                  }, 4000
                )
                break;
            }
        }
        if(bool){
            console.log(arraytest)
            const provider= window.ethereum;
            const web3= new Web3(provider);
            if(chainId!==84532){
                alert("Switch network to Base sepolia!")
            }
            else{
            const contract = await new web3.eth.Contract(abi, ca);
            try{
                await contract.methods.addList(arraytest).send(
                    {from : address}
                )
                setUserNotFound(false)
                setstBool(false)
            }
            catch (err) {
                document.querySelector(".connection-info").style.display="block";
                setTimeout(
                  ()=>{
                    document.querySelector(".connection-info").style.display="none";
                  }, 4000
                )
                }
            }
        }
    }
    return(
    <div>
       {userNotFound && <div className="mn-registered">
        <div className='input-warn'>Input must not be empty</div>
           <div className="sub-registered">
                <div>
                    <div className="sub-one">
                       <div style={{fontSize:"30px"}}>1</div>
                        <div className="input-val">
                        <div><input className="topic" type="text" placeholder="Topic"/></div>
                        <div><input className="link" type="link" placeholder="https://"/></div>
                        </div>
                    </div>
                    <div className="sub-one">
                       <div style={{fontSize:"30px"}}>2</div>
                        <div className="input-val">
                        <div><input className="topic" contentEditable="false" type="text" placeholder="Topic"/></div>
                        <div><input className="link" type="link" placeholder="https://"/></div>
                        </div>
                    </div>
                    <div className="sub-one">
                       <div style={{fontSize:"30px"}}>3</div>
                        <div className="input-val">
                        <div><input className="topic" type="text" placeholder="Topic"/></div>
                        <div><input className="link" type="link" placeholder="https://"/></div>
                        </div>
                    </div>
                    <div className="sub-one">
                       <div style={{fontSize:"30px"}}>4</div>
                        <div className="input-val">
                        <div><input className="topic" type="text" placeholder="Topic"/></div>
                        <div><input className="link" type="link" placeholder="https://"/></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="add-list">
                <div onClick={submitit}>
                    Upload
                </div>
            </div>
        </div>
        }
    </div>
  )
}
