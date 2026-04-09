'use client'
import {Select} from "@radix-ui/themes";
import {Issue, User} from "@/app/generated/prisma/client";
import {useQuery} from "@tanstack/react-query";
import Skeleton from "@/app/components/Skeleton";
import toast, {Toaster} from "react-hot-toast";

const AssigneeSelect = ({issue}: { issue: Issue }) => {


    const {data: users, error, isLoading} = useUsers()

    if (isLoading) return <Skeleton/>
    if (error) return null

    const assignUser = async (userId: string) => {

        try {
            const res = await fetch(`/api/issues/${issue.id}`, {
                method: "PATCH",
                body: JSON.stringify({assignedToUserId: userId === 'unassigned' ? null : userId}),
            })

            if (!res.ok) throw Error()
        } catch (e) {
            toast.error("Changes could not be saved");
        }
    }

    return (
        <>
            <Select.Root defaultValue={issue.assignedToUserId || "unassigned"} onValueChange={assignUser}>
                <Select.Trigger placeholder='Assign...'/>
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestion</Select.Label>
                        <Select.Item value="unassigned">Unassigned</Select.Item>
                        {users?.map((user) =>
                            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                        )}
                    </Select.Group>
                </Select.Content>
            </Select.Root>

            <Toaster/>
        </>
    );
};

const useUsers = () => useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => fetch("/api/users").then(res => res.json()),
    staleTime: 60 * 1000,
    retry: 3
})

export default AssigneeSelect;
