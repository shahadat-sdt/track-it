'use client'
import {Button, Callout, Spinner, TextArea, TextField} from "@radix-ui/themes";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {z} from "zod";
import {issueSchema} from "@/app/ValidationSchemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {ErrorMessage} from "@/app/components";
import {Issue} from "@/app/generated/prisma/client";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({issue}: { issue?: Issue }) => {

        const router = useRouter()
        const [error, setError] = useState('')
        const [isSubmitting, setIsSubmitting] = useState(false)


        const {register, handleSubmit, formState: {errors}} = useForm<IssueFormData>({
            resolver: zodResolver(issueSchema)
        })

        const onsubmit = handleSubmit(async (data) => {
            try {
                setIsSubmitting(true)
                if (issue)
                    await fetch(`/api/issues/${issue.id}`, {method: "PATCH", body: JSON.stringify(data)});
                else {
                    const res = await fetch("/api/issues", {method: "POST", body: JSON.stringify(data)});
                    if (!res.ok) throw new Error()
                }
                router.push("/issues");
                router.refresh();

            } catch (e) {
                setIsSubmitting(false)
                setError("Unexpected error occurred.");
            }
        })

        return (
            <div className="max-w-xl">

                {error && <Callout.Root color='red' className='mb-5'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>}
                <form className="space-y-3" onSubmit={onsubmit}>
                    <TextField.Root defaultValue={issue?.name} placeholder='Name' {...register("name")}/>
                    <ErrorMessage>{errors.name?.message}</ErrorMessage>
                    <TextArea defaultValue={issue?.description} placeholder='Description' {...register("description")}/>
                    <ErrorMessage>{errors.description?.message}</ErrorMessage>
                    <Button disabled={isSubmitting}>
                        {issue ? "Update Issue" : " Submit New Issue"}{' '} {isSubmitting && <Spinner/>}
                    </Button>
                </form>
            </div>
        )
            ;
    }
;

export default IssueForm;
