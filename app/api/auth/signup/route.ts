import { NextResponse, NextRequest } from "next/server";
import db from '@/db';
import bcrypt from 'bcrypt';
import { RowDataPacket } from "mysql2/promise";

interface formType{
    email : string;
    password: string;
    name: string;
}


export const POST = async (
    req: NextRequest
) : Promise<NextResponse> =>{
    if(req.method === 'POST'){
        const{email, password, name}: formType = JSON.parse(await req.text());
        //텍스트로 받은것을 json파일로 파씽하는거
        if(!email || !password || !name){
            return NextResponse.json({message: "데이터가 부족함다"})
        }
        const hash = await bcrypt.hash(password, 10);
        // console.log(hash)

        const [checkMember] = await db.query<RowDataPacket[]>('select count(*) as cnt from choiyul.member where email = ?', [email]);
        const memberCnt = checkMember[0].cnt;

        if(memberCnt > 0){
            return NextResponse.json({message: "해당 이메일이 존재합니다"})
        }else{
            await db.query('insert into choiyul.member (email, password, name) values(?,?,?)', [email, hash, name]);
            const data = {
                email : email,
                password : password
            }
            return NextResponse.json({message: "성공", data: data})
        }
    }else{
        return NextResponse.json({error: "실패"})
    }
}