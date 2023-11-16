'use client'
import Link from 'next/link';
import {useEffect, useState} from 'react';
import { useCustomSession } from '../sessions';


interface formType {
    userid: string;
    username: string;
    title: string;
    content: string
}

export default function Write(){
    const {data: session} = useCustomSession();
    console.log(session)
    const [formData, setFormData] = useState<formType>({
        userid: session?.user?.email ?? '',
        username: session?.user?.name ?? '',
        // ??두개를 쓰면 왼쪽에 있는게 적용(조건문 a === true ? a : b) a두번쓰니깐 ??로
        title: '',
        content: ''
    })


    const changeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setFormData({...formData, [e.target.name] : e.target.value});
        // console.log(formData)
    }

    const submitEvent = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            const res = await fetch('/api/write',{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if(res.ok){
                const data = await res.json();
                // console.log(data.message)
                // alert('정상적으로 등록하였습니다.')
                window.location.href='/';

            }else{
                const errorData = await res.json();
                console.log(errorData.error)
            }
        }catch(error){
            console.log(error);
        }
    }
    return(
        <>
            <form method='post' onSubmit={submitEvent} className='border flex-col max-w-7xl mx-auto py-5 mt-5'>
                <div className="flex mx-auto">
                    <p className='basis-1/7 mx-auto'>작성자 : </p>
                    <input type="text" name='name' defaultValue={session?.user.name ?? ''} className='border block w-[80%] mx-auto shadow text-gray-700 text-sm mb-2 basis-4/6' onChange={changeEvent} />
                </div>
                <div className="flex mx-auto">
                    <p className='basis-1/7 mx-auto'>제목 : </p>
                    <input type="text" name='title' defaultValue={formData.title} className='border block w-[80%] mx-auto shadow text-gray-700 text-sm mb-2 basis-4/6'  onChange={changeEvent} />
                </div>
                <div className="flex mx-auto">
                    <p className='basis-1/7 mx-auto'>내용 : </p>
                    <textarea name='content' defaultValue={formData.content} className='border block w-[80%] mx-auto shadow text-gray-700 text-sm mb-2 basis-4/6' onChange={changeEvent} ></textarea>
                </div>
                <div className="flex justify-end mx-4 my-4">
                    <Link href="/" className='bg-purple-300 text-white px-4 py-2 rounded shadow-md hover:bg-purple-500 focus:outline-none mr-2'>취소</Link>
                    <button className='bg-pink-300 text-white px-4 py-2 rounded shadow-md hover:bg-pink-500 focus:outline-none'>등록</button>
                </div>
            </form>
        </>
    )
}