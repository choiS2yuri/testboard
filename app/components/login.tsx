'use client';

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Login(){
    const redireactTo = ()=>{
        sessionStorage.setItem('preUrl', window.location.href);
        window.location.href="/login";
    }
    return(
        
        <button onClick={redireactTo} className="hover:font-bold">로그인</button>
    )
}