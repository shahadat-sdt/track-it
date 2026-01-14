import {Button} from "@radix-ui/themes";
import Link from "next/dist/client/link";

const IssuesPage = () => {
 return (
    <div>
        <Button><Link href="/issues/new"> Create New Issue</Link></Button>
    </div>
  );
};

export default IssuesPage;
