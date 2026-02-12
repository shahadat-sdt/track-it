import {issueSchema} from "@/app/ValidationSchemas";
import {NextResponse} from "next/dist/server/web/spec-extension/response";
import {prisma} from "@/client";
import {NextRequest} from "next/dist/server/web/spec-extension/request";
import delay from "delay";

export async function PATCH(request: Request, {params}: { params: { id: string } }) {

    const param = await params

    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if (!validation.success) return NextResponse.json(validation.error.formErrors, {status: 400})
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(param.id)}
    })
    if (!issue) return NextResponse.json("Invalid Issue", {status: 404})

    const updatedIssue = await prisma.issue.update({
        where: {id: parseInt(param.id)},
        data: {
            name: body.name,
            description: body.description,
        }
    })

    return NextResponse.json(updatedIssue);
}


export async function DELETE(req : NextRequest,{params}: { params: { id: string } }) {

    const param = await params

   await delay(2000)
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(param.id)}
    })
    if (!issue) return NextResponse.json("Invalid Issue", {status: 404})

    await prisma.issue.delete({
        where: {id: parseInt(param.id)}
    })
    return NextResponse.json({});

}
