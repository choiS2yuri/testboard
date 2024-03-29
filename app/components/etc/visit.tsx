'use client'

import { useEffect } from "react"


// async function getData() {

//     const res1 = await fetch('http://localhost:3000/api/get-ip');
//     const data = await res1.json();

//     await fetch('http://localhost:3000/api/visit',{
//         cache:'no-cache',
//         method: 'POST',
//         headers:{
//             'Content-Type' : 'application/json'
//         },
//         body: JSON.stringify({
//             ip:data.data.ip,
//             platform: data.data.platform,
//             agent: data.data.userAgent
//         })
//     })
//     return data;
// }


export default async function Visit(){

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const res1 = await fetch('/api/get-ip');
                const data = await res1.json();
                await fetch('/api/visit',{
                    cache: 'no-cache',
                    method: 'POST',
                    headers:{
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        ip: data.data.ip,
                        platform: data.data.platform,
                        agent: data.data.userAgent
                    })
                })
            }catch(error){
                alert("error")
            }
        }
        fetchData()
    },[])

    // const resultData = await getData();
    // const data = resultData.data;
    return(
        <p>방문자</p>
    )
}