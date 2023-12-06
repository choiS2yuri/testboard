/*
const {data: session} = useCustomSession();
const data = {
    id:5,
    name: "홍길동",
    email: "abcd@naver.com"
}
변수 내에 중괄호 {}가 들어가면 구조 분해 할당(destructuring assignment) > 해당 객체에서 그 속성을 추출해서 새로운 변수로 할당할 때 사용
예를들어... data.id 이걸 변수로 저장을 따로 하고 싶다면 
const {id} = data > const id = 5값이 저장된다.
*/
'use client';

import { useEffect, useState } from "react";
import { useCustomSession } from "../sessions";
import { useParams } from "next/navigation";

interface CommentProps {
    id: number;
}

interface formType {
    parentid: number;
    userid: string;
    username: string;
    content: string;
}
interface CommentType{
    id: number;
    parentid: number;
    userid: string;
    username: string;
    content: string;
    date: string;

}

export default function Comment(props : CommentProps){
    const {id} = props;
    const [totalComment, setTotalComment] = useState<CommentType[]>()
    const commentValue = (e: React.ChangeEvent<HTMLInputElement>)=>{
        // setComment(e.target.value)
        setFormData({...formData, [e.target.name]: e.target.value});
        // console.log(formData)
    }
    const params = useParams();
    const {data: session} = useCustomSession();
    const [formData, setFormData]= useState<formType>({
        parentid: id,
        userid: session?.user?.email ?? "",
        username: session?.user?.name ?? '',
        content: ''
    })
    useEffect(()=>{
        setFormData({
            parentid: id,
            userid: session?.user?.email ?? '',
            username: session?.user?.name ?? '',
            content: ''
        })
    },[session?.user.name, session?.user.email, id])
    

    
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const res = await fetch(`/api/comment?id=${params.id}`)
                const data = await res.json();
                console.log(data)
                if(data.result){
                    const sortedComments = (data.result as CommentType[]).sort((a, b) => {
                        const dateA = new Date(a.date).getTime();
                        const dateB = new Date(b.date).getTime();
                        return dateB - dateA; });
                    setTotalComment(sortedComments);
                }
            }catch(error){
                console.log(error)
            }
        }
        fetchData()
    },[params.id])

    const cmtSubmit = async ()=>{
        try{
            const res = await fetch ('/api/comment',{
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if(res.ok){
                const data = await res.json();
                // console.log(data)댓글 등록되면 성공이 뜸
                setTotalComment(data.result)
            }
        }catch(error){
            console.log(error)
        }
    }
    return(
        <>
            {
                session && session.user && <>
                <div className="max-w-7xl mx-auto bg-pink-400 my-8">
                    <p className="flex justify-start bold text-white">&nbsp;⌨&nbsp;댓글 목록</p>
                </div>
                    {
                        totalComment && totalComment.map((e,i)=>{
                            const date = new Date(e.date);
                                // date.setTime(date.getTime()+(60*60*9*1000))
                                const year = date.getFullYear();
                                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                const day = date.getDate().toString().padStart(2,'0')
                                const hours = (date.getHours()+9).toString().padStart(2,'0')
                                const minutes = date.getMinutes().toString().padStart(2,'0')
                                const seconds = date.getSeconds().toString().padStart(2,'0')
                                const fotmatDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
                            return(
                                <div key={i} className="max-w-5xl mx-auto">
                                    <div className="flex basis-full justify-between border-b-2">
                                        💬
                                        <div className="flex justify-start basis-1/7">
                                            <p className="basis-1/2">{e.userid}</p>
                                            <p className="basis-1/2">({e.username})</p>
                                        </div>
                                        <div className="flex justify-start w-1/2">
                                            <p className="w-full text-left">{e.content}</p>
                                        </div>
                                        <p className="basis-2/7">{fotmatDate}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="max-w-7xl mx-auto flex justify-center my-5">
                        <input onChange={commentValue} name="content" type="text" className="border p-2 border-pink-500 rounded w-2/3"/>
                        <button onClick={()=>{cmtSubmit()}} className="rounded-lg border ml-2 p-2 shadow-sm">댓글 등록</button>
                    </div>
                </>
            }
        </>
    )
}