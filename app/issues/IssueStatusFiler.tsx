import {Select} from "@radix-ui/themes";
import {Status} from "@/app/generated/prisma/enums";

const IssueStatusFiler = () => {

    const statuses: { value?: Status, label: string }[] = [
        {label: "All"},
        {value: "OPEN", label: "Open"},
        {value: "CLOSED", label: "Closed"},
        {value: "IN_PROGRESS", label: "In Progress"},
    ]
    return (
        <Select.Root>
            <Select.Trigger placeholder=' Filter by Status...'/>
            <Select.Content>
                {statuses.map(status => <Select.Item key={status.label}
                                                     value={status.value || "Null"}>{status.label}</Select.Item>)}
            </Select.Content>
        </Select.Root>
    );
};

export default IssueStatusFiler;
