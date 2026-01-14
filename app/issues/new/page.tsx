'use client'
import {Button, Callout, Text, TextArea, TextField} from "@radix-ui/themes";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {z} from "zod";
import {createIssueSchema} from "@/app/ValidationSchemas";
import {zodResolver} from "@hookform/resolvers/zod";

type NewIssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {

    const router = useRouter()
    const [error, setError] = useState('')

    const {register, handleSubmit, formState: {errors}} = useForm<NewIssueForm>({
        resolver: zodResolver(createIssueSchema)
    })
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
                {errors.name && <Text as='p'   color='red'>{errors.name?.message}</Text>}
                <TextArea placeholder='Description' {...register("description")}/>
                {errors.description && <Text as='p' color='red'>{errors.description?.message}</Text>}
                <Button>Submit New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
