'use client'
import {Button, Callout, TextArea, TextField} from "@radix-ui/themes";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useRouter} from "next/navigation";

interface NewIssueForm {
    name: string;
    description: string;
}

const NewIssuePage = () => {

    const router = useRouter()
    const [error, setError] = useState('')

    const {register, handleSubmit} = useForm<NewIssueForm>()
    return (
        <div className="max-w-xl">

            {error && <Callout.Root color='red' className='mb-5'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className="space-y-3  " onSubmit={handleSubmit(async (data) => {
                try {
                    const res = await fetch("/api/issues", {method: "POST", body: JSON.stringify(data)});
                    if (!res.ok) throw new Error()
                    router.push("/issues");

                } catch (e) {
                    setError("Unexpected error occurred.");
                }
            })}>
                <TextField.Root placeholder='Name' {...register("name")}/>
                <TextArea placeholder='Description' {...register("description")}/>
                <Button>Submit New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
