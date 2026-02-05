'use client'
import { blockAssociationSubmission } from "@/lib/db"
import { SubmissionInputs } from "@/lib/definitions"
import { useRouter } from "next/navigation"
import { useForm, SubmitHandler } from "react-hook-form"

export default function ContactForm() {
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SubmissionInputs>()
  const onSubmit: SubmitHandler<SubmissionInputs> = async (data) => {
    const submissionResponse = await blockAssociationSubmission(data)
    console.log(submissionResponse)
    router.push("./contact/confirm")
  }

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
        <label>What&apos;s Your Name?* </label>
        <input defaultValue="" {...register("name", { required: true })} />
        {errors.name && <span className="form_error">This field is required</span>}
        <label>What&apos;s Your Email?* </label>
        <input defaultValue="" {...register("email", { required: true })} />
        {errors.email && <span className="form_error">This field is required</span>}
        <label>Block Association Name:* </label>
        <input defaultValue="" {...register("block_association_name", { required: true })} />
        {errors.block_association_name && <span className="form_error">This field is required</span>}
        <label>Block Association Boundaries:* </label>
        <input defaultValue="" {...register("block_association_boundaries", { required: true })} />
        {errors.block_association_boundaries && <span className="form_error">This field is required</span>}
        <label>Block Association Email: </label>
        <input defaultValue="" {...register("block_association_email")} />
        <label>Block Association Phone: </label>
        <input defaultValue="" {...register("block_association_phone")} />
        <label>Block Association Website: </label>
        <input defaultValue="" {...register("block_association_website")} />
        <label>Other Info: </label>
        <textarea defaultValue="" {...register("other_info")} placeholder="Any other info you want to include (focus of the block association, any other contacts, etc)" />
        <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
    </form>
  )
}