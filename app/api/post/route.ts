import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';
// import { NextApiRequest, NextApiResponse } from 'next'; 이런것도 있다아
import { RowDataPacket } from 'mysql2/promise';



export const GET = async (
    req: NextRequest,
    res: NextResponse
): Promise<NextResponse> =>{


    if(req.method === 'GET'){

        console.log(req.nextUrl.searchParams.get("page"));
        const page = Number(req.nextUrl.searchParams.get("page") || 1);
        const perPage = 10;
        const offset = (page - 1)* perPage;


        try{
            const [results] = await db.query<RowDataPacket[]>('SELECT * FROM board order by date DESC limit ?  offset ? ',[perPage, offset]);
            //?를 쓰면 []을 넣어줘야함
            //10개씩 10개를 건너뛰기
            const [countResult] = await db.query<RowDataPacket[]>('select count(*) as cnt from choiyul.board')

            const totalCnt = countResult[0].cnt
            // console.log(results)
            return NextResponse.json({message: "성공", results, totalCnt, page, perPage})
        }catch(error){
            return  NextResponse.json({error: "에러가 발생하였습니다."})
        }
    }
    //테이블 데이터 받을 때 써주는 방법

    return NextResponse.json({error: "에러가 발생하였습니다."})


}