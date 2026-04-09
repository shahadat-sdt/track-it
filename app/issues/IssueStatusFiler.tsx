'use client'
import {Select} from "@radix-ui/themes";
import {Status} from "@/app/generated/prisma/enums";
import {useRouter} from "next/navigation";

const IssueStatusFiler = () => {

    const router = useRouter();
    const statuses: { value?: Status, label: string }[] = [
        {label: "All"},
        {value: "OPEN", label: "Open"},
        {value: "CLOSED", label: "Closed"},
        {value: "IN_PROGRESS", label: "In Progress"},
    ]

    return (
        <Select.Root onValueChange={(status) => {
            const query = status === 'Unassigned' ? '' : `?status=${status}`;
            router.push(`/issues/${query}`);
        }}>
            <Select.Trigger placeholder=' Filter by Status...'/>
            <Select.Content>
                {/*<Select.Item*/}
                {/*    value={'Unassigned'}>Unassigned</Select.Item>*/}
                {statuses.map(status =>
                    <Select.Item key={status.label}
                                 value={status.value ?? 'Unassigned'}>{status.label}</Select.Item>)}
            </Select.Content>
        </Select.Root>
    );
};

export default IssueStatusFiler;
