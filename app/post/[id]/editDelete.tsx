'use client';

import { useCustomSession } from "@/app/sessions";
import Link from "next/link";


interface propsType{
    results:{
      id:number;
      userid: string;
      title?:string;
      content?:string;
      username?:string;
      count?:number;
      date?:string;
    }
  }

const deletePost = async(e:number) =>{
    try{
        const res = await fetch('/api/delete',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({id: e})
        })
        if(res.ok){
            alert("정상적으로 삭제되었습니다.")
            window.location.href="/"
        }else{
            alert('삭제가 실패하였습니다.')
            return;
        }
    }catch(error){
        console.log(error)
    }
}
export default function EditDelete({results} : propsType){
    const {data: session} = useCustomSession();

    return(
        <>
            {
            session && session.user && (
              (results && results && session.user.email === results.userid) || session.user.level === 10
            ) && <>
              <div className="flex justify-end">
                <Link href={'/'} className="bg-pink-300 text-white px-4 py-2 rounded shadow-md hover:bg-pink-500 focus:outline-none mr-2">수정</Link>
                <button onClick={()=>{deletePost(results.id)}} className="bg-purple-300 text-white px-4 py-2 rounded shadow-md hover:bg-purple-500 focus:outline-none">삭제</button>
              </div>  
            </>
          }
        </>

    )
}