import {patchIssueSchema} from "@/app/ValidationSchemas";
import {NextResponse} from "next/dist/server/web/spec-extension/response";
import {prisma} from "@/client";
import {NextRequest} from "next/dist/server/web/spec-extension/request";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/AuthOptions";

export async function PATCH(request: Request, {params}: { params: { id: string } }) {

    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({}, {status: 401});


    const param = await params

    const body = await request.json();

    const validation = patchIssueSchema.safeParse(body);
    if (!validation.success) return NextResponse.json(validation.error.formErrors, {status: 400})

    const {name, description, assignedToUserId} = body;

    if (assignedToUserId) {
       const user = await prisma.user.findUnique({where: {id: assignedToUserId}})
        if (!user) {
            return NextResponse.json({error: "Invalid user"}, {status: 400})
        }
    }

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(param.id)}
    })
    if (!issue) return NextResponse.json("Invalid Issue", {status: 404})

    const updatedIssue = await prisma.issue.update({
        where: {id: parseInt(param.id)},
        data: {
            name,
            description,
            assignedToUserId
        }
    })

    return NextResponse.json(updatedIssue);
}


export async function DELETE(req: NextRequest, {params}: { params: { id: string } }) {

    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({}, {status: 401});

    const param = await params

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(param.id)}
    })
    if (!issue) return NextResponse.json("Invalid Issue", {status: 404})

    await prisma.issue.delete({
        where: {id: parseInt(param.id)}
    })
    return NextResponse.json({});

}
