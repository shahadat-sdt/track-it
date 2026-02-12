import {prisma} from "@/client";
import {notFound} from "next/navigation";
import {Box, Flex, Grid} from "@radix-ui/themes";
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import IssueDetails from "@/app/issues/[id]/IssueDetails";
import DeleteIssueButton from "@/app/issues/[id]/DeleteIssueButton";


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
        <Grid columns={{initial: "1", md: "5"}} gap="5">
            <Box className='lg:col-span-4'>
                <IssueDetails issue={issue}/>
            </Box>

            <Box>
                <Flex direction="column" gap='4'>

                    <EditIssueButton issueId={issue.id}/>
                    <DeleteIssueButton/>
                </Flex>

            </Box>
        </Grid>
    );
};

export default IssueDetailsPage;
