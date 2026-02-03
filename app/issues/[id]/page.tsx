import {prisma} from "@/client";
import {notFound} from "next/navigation";
import {Card, Flex, Heading} from "@radix-ui/themes";
import {IssueStatusBadge} from "@/app/components";


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
            <Heading>{issue.name}</Heading>
            <Flex gap='3' my='2'>
                <IssueStatusBadge status={issue.status}/>
                <p>{issue.createdAt.toDateString()}</p>
            </Flex>
            <Card>
                <p>{issue.description}</p>
            </Card>


        </div>
    );
};

export default IssueDetailsPage;
