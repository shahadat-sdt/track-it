import Link from "next/dist/client/link";
import {Button, Flex} from "@radix-ui/themes";
import IssueStatusFiler from "@/app/issues/IssueStatusFiler";

const IssueActions = () => {
    return (
        <Flex mb='5' justify='between'>
            <IssueStatusFiler/>
            <Button><Link href="/issues/new"> Create New Issue</Link></Button>

        </Flex>
    );
};

export default IssueActions;
