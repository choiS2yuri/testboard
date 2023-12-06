import { NextRequest, NextResponse } from "next/server";
import db from '@/db';
import { RowDataPacket } from "mysql2";

interface PostType{
    ip: string;
    platform: string;
    agent: string;
}
export const POST = async (req: NextRequest): Promise<NextResponse> => {
    const {ip, platform, agent} : PostType = JSON.parse(await req.text());
    if(req.method === 'POST'){
        const [results] = await db.query<RowDataPacket[]>('select count(*) as cnt from choiyul.visits where ip_address = ? and visit_time > now() - interval 6 hour', [ip])
        if(results[0].cnt <=0){
            await db.query<RowDataPacket[]>('insert into choiyul.visits (platform, agent, ip_address) values (?,?,?)',[platform, agent, ip])
        }
        return NextResponse.json({message:"성공"})
    }else{
        return NextResponse.json({error:"알수없는에러가 발생하였습니다."})
    }
}