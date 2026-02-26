'use client'
import {Select} from "@radix-ui/themes";
import {User} from "@/app/generated/prisma/client";
import {useQuery} from "@tanstack/react-query";
import Skeleton from "@/app/components/Skeleton";

const AssigneeSelect = () => {


    const {data: users, error, isLoading} = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: () => fetch("/api/users").then(res => res.json()),
        staleTime: 60 * 1000,
        retry: 3
    })

    if (isLoading) return <Skeleton/>
    if (error) return null

    return (
        <Select.Root>
            <Select.Trigger placeholder='Assign...'/>
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestion</Select.Label>
                    {users?.map((user) =>
                        <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                    )}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default AssigneeSelect;
