
async function getData() {
    const res = await fetch('http://localhost:3000/api/admin',{
        cache:'no-cache',
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            pathUrl: 'mainCnt'
        })
    })
    const data = res.json();
    if(!res.ok){
        console.log('에러가 발생하였습니다.')
        return
    }
    return data;
}

//서버를 불러와서 밑에서 받아옴 ssr
//담을 스테이트를 정하고 이펙트로 불러옴
export default async function Totalcnt(){
    const resultData = await getData();
    const data = resultData.data;
    const listMenu = ['총회원수','신규가입수','금일새글수','금일새댓글수','금일방문자수','총방문자수']
    const listCnt = [data.totalCnt, data.todayCnt, data.writeCnt, data.commentCnt, data.visitCnt, data.visitTotalCnt]
    return(
        <ul className="flex justify-between flex-wrap lg:mb-4">
            {
                listMenu.map((e,i)=>{
                    return(
                        <li key={i} className="widget p-4 basis-[48%] lg:basis-[15%] mb-4 lg:mb-0 flex justify-between">
                            <h3>{e}</h3>
                            <p><span className="font-bold text-red-500">{listCnt[i]}</span>{i === 2 || i === 3 ? "개" : "명"}</p>
                        </li>
                    )
                })
            }
        </ul>
    )
}

