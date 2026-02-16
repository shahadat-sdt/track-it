import {NextRequest} from "next/dist/server/web/spec-extension/request";
import {NextResponse} from "next/dist/server/web/spec-extension/response";
import {prisma} from "@/client";
import {issueSchema} from "@/app/ValidationSchemas";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/AuthOptions";


export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({},{status: 401});

    const body = await request.json()
    const validation = issueSchema.safeParse(body)
    if (!validation.success) return NextResponse.json(validation.error.format(), {status: 400})
    const newIssue = await prisma.issue.create({
        data: {name: body.name, description: body.description}
    })
    return NextResponse.json(newIssue, {status: 201})
}