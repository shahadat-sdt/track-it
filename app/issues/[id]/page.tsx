import {prisma} from "@/client";
import { notFound } from "next/navigation";


interface Props {
    params: { id: string };
}

const IssueDetailsPage = async ({params}: Props) => {

    const param = await params
    const id = parseInt(param.id);


    const issue = await prisma.issue.findUnique({
        where: {id: id}
    })
    if (!issue) notFound();
    return (
        <div>
            <p>{issue.name}</p>
            <p>{issue.status}</p>
            <p>{issue.description}</p>
            <p>{issue.createdAt.toDateString()}</p>

        </div>
    );
};

export default IssueDetailsPage;
