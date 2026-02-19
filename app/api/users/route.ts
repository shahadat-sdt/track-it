import {prisma} from "@/client";
import {NextResponse} from "next/dist/server/web/spec-extension/response";

export async function GET(request: Request) {
    const users = await prisma.user.findMany({
        orderBy: {name: 'asc'}
    })
    return NextResponse.json(users)
}