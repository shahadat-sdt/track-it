import {Badge} from "@radix-ui/themes";
import {Status} from "@/app/generated/prisma/enums";

const statusMap : Record<Status, {label : string, color : 'red' | 'green' | 'violet'}> = {
    CLOSED : {label: "Closed", color : 'green'},
    OPEN : {label: "Open", color : 'red'},
    IN_PROGRESS : {label: "In Progress", color : 'violet'}
};

const IssueStatusBadge = ({status}: { status: Status }) => {
    return (
        <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
    );
};

export default IssueStatusBadge;
