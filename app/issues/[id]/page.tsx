import {prisma} from "@/client";
import {notFound} from "next/navigation";
import {Box, Button, Card, Flex, Grid, Heading} from "@radix-ui/themes";
import {IssueStatusBadge} from "@/app/components";
import Link from "next/link";
import {Pencil2Icon} from "@radix-ui/react-icons";


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
        <Grid columns={{
            initial: "1", md: "2"
        }} gap="5">
            <Box>
                <Heading>{issue.name}</Heading>
                <Flex gap='3' my='2'>
                    <IssueStatusBadge status={issue.status}/>
                    <p>{issue.createdAt.toDateString()}</p>
                </Flex>
                <Card>
                    <p>{issue.description}</p>
                </Card>


            </Box>
            <Box>
                <Button>
                    <Pencil2Icon/>
                    <Link href={`/issues/${id}/edit`}>Edit Issue</Link>
                </Button>
            </Box>
        </Grid>
    );
};

export default IssueDetailsPage;
