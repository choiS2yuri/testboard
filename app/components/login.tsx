'use client';
export default function Login(){
    const redireactTo = ()=>{
        sessionStorage.setItem('preUrl', window.location.href);
        window.location.href="/login";
    }
    return(
        <button onClick={redireactTo}>로그인</button>
    )
}