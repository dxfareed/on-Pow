//import React from 'react'

import WalletCMP from "../mainComponents/walletCMP";

export default function RegisteredUser({userName,setUserName}) {
    const arraytest=[];
    function submitit(){
    const topiclen=document.getElementsByClassName("topic").length
    for(var i=0; i<topiclen; i++){
        if( document.getElementsByClassName("topic")[i].value !== "" && document.getElementsByClassName("link")[i].value !== "" ){
        arraytest.push({
            topic:document.getElementsByClassName("topic")[i].value,
            link: document.getElementsByClassName("link")[i].value
        }
        );
    }
    }
    console.log(userName);
    console.log(arraytest);
    }
    return (
    <div>
        <div className="mn-registered">
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
                    Submit
                </div>
            </div>
        </div>
    </div>
  )
}
