import {NextRequest} from "next/dist/server/web/spec-extension/request";
import {z} from "zod";
import {NextResponse} from "next/dist/server/web/spec-extension/response";
import {prisma} from "@/client";


const createIssueSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1)
})

export async function POST(request: NextRequest) {
    const body = await request.json()
    const validation = createIssueSchema.safeParse(body)
    if (!validation.success) return NextResponse.json(validation.error.message, {status: 400})
    const newIssue = await prisma.issue.create({
        data: {name: body.name, description: body.description}
    })
    return NextResponse.json(newIssue, {status: 201})
}