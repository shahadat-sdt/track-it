import Link from "next/dist/client/link";
import {Button} from "@radix-ui/themes";

const IssueActions = () => {
    return (
        <div className='mb-5'>
            <Button><Link href="/issues/new"> Create New Issue</Link></Button>
        </div>
    );
};

export default IssueActions;
