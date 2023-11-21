'use client'

import { signIn } from "next-auth/react";
import React, { useState } from "react";


interface formType{
    email : string;
    password: string;
    name: string;
    nickname: string;
}

export default function Register(){
    const [formData, setFormData] = useState<formType>({
        email: '',
        password: '',
        name : '',
        nickname: '',
    })
    const [message, setMessage] = useState<string>("");
    const changeEvent = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({
            ...formData, [e.target.name] : e.target.value
        })
        // console.log(formData)
    }
    const submitEvent =  async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            const res = await fetch('/api/auth/signup',{
                method : "POST",
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if(res.ok){
                const data = await res.json();
                const result = data.data;
                if(data.message === '성공'){
                    alert("회원가입이 완료되었습니다.")
                    // window.location.href='/'
                    signIn('credentials',{
                        email: result.email,
                        password: result.password,
                        callbackUrl: '/'
                    })
                }
                // console.log(data)
                setMessage(data.message);
            }
        }catch(error){
            console.log(error)
        }
    }


    return(
       <>
        <form onSubmit={submitEvent} method="POST" className="border flex-col max-w-7xl mx-auto py-5 mt-5 items-center">
            <div className="flex mx-auto">
                <p className='basis-1/7 mx-auto'>이메일 </p>
                <input onChange={changeEvent} type="text" placeholder="이메일" name="email" required className='border block w-[80%] mx-auto shadow text-gray-700 text-sm mb-2 basis-4/6' />
            </div>
            <div className="flex mx-auto">
                <p className='basis-1/7 mx-auto'>비밀번호</p>
                <input onChange={changeEvent}  type="password" placeholder="비밀번호" name="password" required className='border block w-[80%] mx-auto shadow text-gray-700 text-sm mb-2 basis-4/6' />
            </div>
            <div className="flex mx-auto">
                <p className='basis-1/7 mx-auto'>이름</p>    
                <input onChange={changeEvent} type="text" placeholder="이름" name="name" required className='border block w-[80%] mx-auto shadow text-gray-700 text-sm mb-2 basis-4/6' />
            </div>
            <div className="flex mx-auto">
                <p className='basis-1/7 mx-auto'>닉네임</p>    
                <input onChange={changeEvent} type="text" placeholder="닉네임" name="nickname" required className='border block w-[80%] mx-auto shadow text-gray-700 text-sm mb-2 basis-4/6' />
            </div>
            <div className="text-center">
                <button type="submit" className="bg-pink-400 border text-white font-bold px-16 py-4 rounded-md">가입</button>
            </div>
        </form>
       {/* <p className="text-red-500">{message}</p> */}
       </>
    )
}