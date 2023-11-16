import { NextRequest, NextResponse } from "next/server";
import db from '@/db';
import { RowDataPacket } from "mysql2";
interface PostNumber {
    username : string;
    title: string;
    content: string;
}

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    if (req.method === 'GET') {
      try {
        const { username, title, content }: PostNumber = JSON.parse(await req.text());
        if (!username || !title || !content) {
          return NextResponse.json({ message: '데이터가 부족합니다' });
        } else {

          const [results] = await db.query<RowDataPacket[]>('UPDATE choiyul.board SET title = ?, content = ?, username= ? where id ?', [title, content,username])
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