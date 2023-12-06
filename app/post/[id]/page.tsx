import db from '@/db'
import { RowDataPacket } from 'mysql2';
import Link from "next/link"
import getServerSession from 'next-auth'
import Comment from '@/app/components/comment';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import EditDelete from './editDelete';


interface userInfo{
  user :{
    name : string;
    email?:string;
    image?:string;
    level?: number;
  }
}

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

async function Getip() {
  const res = await fetch('http://localhost:3000/api/get-ip');
  const data = res.json();
  if(!res.ok){
    alert('에라가발생하였습니다');
    return
  }
  return data;
}


export default async function Detail({
  params
}:{
  params ?: {id ?: number}
}){
  const getIp = await Getip();
  const userIp = getIp.data.ip
  // console.log(userIp)
  const postId = params?.id !== undefined ? params.id : 1;
  const [results] = await db.query<RowDataPacket[]>('select * from choiyul.board where id = ?', [postId]);
  const post = results && results[0];
  let session = await getServerSession(authOptions) as userInfo;
  const date = new Date(post.date);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2,'0')
  const fotmatDate = `${year}-${month}-${day}`

  const [countResult] = await db.query<RowDataPacket[]>('select count (*) as cnt from choiyul.view_log where postid = ? and ip_address = ?', [postId,userIp]);
  const totalCnt = countResult[0].cnt;
  console.log(totalCnt+"개")
  if(results.length > 0){
    if(totalCnt === 0){
      await db.query<RowDataPacket[]>('update choiyul.board set count = count + 1 where id = ?',[postId])
    }
    await db.query<RowDataPacket[]>('insert into choiyul.view_log (postid, ip_address, view_date) select ?,?, NOW() where not exists(select 1 from choiyul.view_log where postid = ? and ip_address = ? and view_date > now() - interval 24 hour)', [postId,userIp, postId, userIp])
    // select 1 존재여부를 확인하기 위해 사용 > 1이라는건 상수 값으로 실제 데이터는 중요하지 않으며, 존재여부를 확인하기 위함
    //내가 원하는 테이블에서 어떠한 조건 즉, and 까지 포함한 3가지 조건이 모두 충족하는 조건을 찾는다.
    //어떠한 행도 반환하지 않을때만 참이된다. 즉 3가지 조건이 모두 참일때 혹은 데이터가 없을떄 쿼리가 실행s
  }
    return(
        <>
          <div className='max-w-7xl mx-auto border mt-7 '>
            {
              results.length > 0 && (
                <>
                <div className="text-center">
                  <div className="flex justify-between  my-2 mx-2">
                    <span className="basis-4/5 text-left pl-2">제목 : {post?.title}</span>
                    <span className="basis-1/7 border-r-2 ">작성자 : {post?.username}&nbsp;&nbsp;</span>
                    <span className="basis-1/7">조회수 : {post?.count}</span>
                  </div>
                  <div className="flex justify-start border h-52 pl-2">내용 : {post?.content}
                  </div>
                  <div className="flex justify-end mx-2">
                    <p>날짜 : {fotmatDate}</p>
                  </div>
                  <div className="mx-2 my-2">
                    <EditDelete results={post as propsType['results']} />
                  </div>
                </div>
                  {
                    session ? <Comment id={post?.id}/> : 
                    <p className="block border p-4 text-center my-5 rounded-md w-96"> <Link href="/login">로그인 이후 댓글을 작성할 수 있습니다.</Link></p>
                  }
                  
                </>
              )
            }
          </div>
        </>
    )
}

