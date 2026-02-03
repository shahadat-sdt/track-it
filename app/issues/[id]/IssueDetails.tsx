import {Box, Card, Flex, Heading} from "@radix-ui/themes";
import {IssueStatusBadge} from "@/app/components";
import {Issue} from "@/app/generated/prisma/client";


const IssueDetails = ({issue}: {issue: Issue }) => {
    return (
        <>
            <Heading>{issue.name}</Heading>
            <Flex gap='3' my='2'>
                <IssueStatusBadge status={issue.status}/>
                <p>{issue.createdAt.toDateString()}</p>
            </Flex>
            <Card>
                <p>{issue.description}</p>
            </Card>
        </>
    );
};

export default IssueDetails;
