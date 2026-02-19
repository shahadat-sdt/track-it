'use client'
import {Select} from "@radix-ui/themes";
import {useEffect, useState} from "react";
import {User} from "@/app/generated/prisma/client";

const AssigneeSelect = () => {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const fetchUser = async () => {

            try {
                const users = await fetch("/api/users");
                if (!users.ok) throw new Error("No users found");
                const data = await users.json();
                setUsers(data)

            } catch (e) {
                console.error(e);
            }
        }
        fetchUser()
    }, []);
    return (
        <Select.Root>
            <Select.Trigger placeholder='Assign...'/>
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestion</Select.Label>
                    {users.map((user) =>
                        <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                    )}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default AssigneeSelect;
