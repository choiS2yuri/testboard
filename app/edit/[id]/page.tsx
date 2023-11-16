import db from '@/db';
//먼저 데이터베이스 가져오기
import { RowDataPacket } from 'mysql2/promise';
import Link from 'next/link';
import { NextRequest, NextResponse } from 'next/server';


interface PostNumber {
    id : number;
    title: string;
    content: string;
}



interface editProps{
    params:{
        id: string
    }
}






export default async function Edit(props:editProps){
    // console.log(props.params.id)
    //ssr은 콘솔이 터미널에서 생김(props.params.id)=>내가원하는값만가져올수있음
    const [results]= await db.query<RowDataPacket[]>('select * from choiyul.board where id = ?', [props.params.id]);
    // console.log(results[0].content)
    // console.log(results[0].date)
    // console.log(results[0].title)
    // console.log(results[0].username)


const POST = async (req: NextRequest): Promise<NextResponse> => {
    if (req.method === 'POST') {
      try {
        const { id, title, content }: PostNumber = JSON.parse(await req.text());
        if (!id || !title || !content) {
          return NextResponse.json({ message: '데이터가 부족합니다' });
        } else {

          const [results] = await db.query<RowDataPacket[]>('UPDATE choiyul.board SET title = ?, content = ? where id = ?', [title, content, props.params.id])
          return NextResponse.json({ message: '성공', result: results });
        }
      }      
catch (error) {
        return NextResponse.json({ error: error });
      }
    } else {
      return NextResponse.json({ error: '정상적인 데이터가 아닙니다.' });
    }
  };


    return(
        <>
            {
            results.length > 0 ?
            // action={`/api/edit/${props.params.id}`}
            <form method='POST' action='' className='border flex-col max-w-7xl mx-auto py-5 mt-5'>
                <div className="flex mx-auto">
                    <p className='basis-1/7 mx-auto'>이름</p>
                    <input type="text" name='name' defaultValue={results[0].username}  className='border w-[80%] mx-auto shadow text-gray-700 text-sm mb-2 basis-4/6'/>
                </div>
                <div className="flex mx-auto">
                    <p className='basis-1/7 mx-auto'>제목</p>
                    <input type="text" name='title' defaultValue={results[0].title} className='border w-[80%] mx-auto shadow text-gray-700 text-sm mb-2 basis-4/6' />
                </div>
                <div className="flex mx-auto">
                    <p className='basis-1/7 mx-auto'>내용</p>
                    <textarea name='content' defaultValue={results[0].content}  className='border w-[80%] mx-auto shadow text-gray-700 text-sm mb-2 basis-4/6' />
                </div>
              <Link href="/" className='bg-purple-300 text-white px-4 py-2 rounded shadow-md hover:bg-purple-500 focus:outline-none'>취소</Link>
              <button className='bg-pink-300 text-white px-4 py-2 rounded shadow-md hover:bg-pink-500 focus:outline-none' type='submit' >등록</button>
            </form>
            :
            <NotData />
            }
        </>
    )
}

//results <Date results={results}/> props로 데이터받기


function NotData(){
    return(
        <>
            <p>데이터가 존재하지 않습니다.</p>
            <Link href="/">목록</Link>
        </>
    )
}