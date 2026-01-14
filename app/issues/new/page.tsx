'use client'
import {Button, TextArea, TextField} from "@radix-ui/themes";
import {useForm} from "react-hook-form";
import {useRouter} from "next/dist/client/components/navigation";

interface NewIssueForm {
    name: string;
    description: string;
}

const NewIssuePage = () => {

    const router = useRouter()

    const {register, handleSubmit} = useForm<NewIssueForm>()
    return (
        <form className="space-y-3 max-w-xl " onSubmit={handleSubmit(async (data) => {
            await fetch("/api/issues", {method: "POST", body: JSON.stringify(data)});
            router.push("/issues");
        })}>
            <TextField.Root placeholder='Name' {...register("name")}/>
            <TextArea placeholder='Description' {...register("description")}/>
            <Button>Submit New Issue</Button>
        </form>
    );
};

export default NewIssuePage;
