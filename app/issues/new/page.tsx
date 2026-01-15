'use client'
import {Button, Callout, Spinner, TextArea, TextField} from "@radix-ui/themes";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {z} from "zod";
import {createIssueSchema} from "@/app/ValidationSchemas";
import {zodResolver} from "@hookform/resolvers/zod";
import ErrorMessage from "@/app/components/ErrorMessage";

type NewIssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {

    const router = useRouter()
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {register, handleSubmit, formState: {errors}} = useForm<NewIssueForm>({
        resolver: zodResolver(createIssueSchema)
    })
    return (
        <div className="max-w-xl">

            {error && <Callout.Root color='red' className='mb-5'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className="space-y-3" onSubmit={handleSubmit(async (data) => {
                try {
                    setIsSubmitting(true)
                    const res = await fetch("/api/issues", {method: "POST", body: JSON.stringify(data)});
                    if (!res.ok) throw new Error()
                    router.push("/issues");

                } catch (e) {
                    setIsSubmitting(false)
                    setError("Unexpected error occurred.");
                }
            })}>
                <TextField.Root placeholder='Name' {...register("name")}/>
                <ErrorMessage>{errors.name?.message}</ErrorMessage>
                <TextArea placeholder='Description' {...register("description")}/>
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner/>}</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
