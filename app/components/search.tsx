'use client';

import { useState, useRef } from "react";



export default function Search(){
    const [keyword, setKeyword] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>(null);
    const searchValue = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setKeyword(e.target.value)
    }
    /*
        useRef = 해당 요소에 접근하기 위해 / 해당요소의 값의 참조를 저장하기 위해 사용하며, useRef 는 current속성을 가진 객체를 반환
        ※useRef 의 특징 : 참조값이 변경되어도 컴포넌트가 재랜더링 되지않는다.
    */
    const searchSubmit = ()=>{

        if(keyword === '' || null){
            inputRef.current?.focus();
            alert("검색어를 입력해주세요.")
        }else{
            window.location.href=`/search/${keyword}`
        }
    }
    // 함수만들어서 실행함 키워드 함수를 보냄
    return(
        <div className="flex justify-center">
            <input ref={inputRef} type="text" className="border p-2 rounded-lg mx-2 " onChange={searchValue} />
            <button className="rounded-lg bg-pink-300 text-white px-2" onClick={searchSubmit}>검색</button>
        </div>
    )
}