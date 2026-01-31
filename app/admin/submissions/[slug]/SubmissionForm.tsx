"use client";
import { submissionApproval } from "@/lib/db";
import { ApprovedSubmission, SubmissionInputs } from "@/lib/definitions";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePolygon } from "./SubmissionPage";

export let polylayer = [];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 15);
  if (!digits) return "";
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  return `+${digits.slice(0, 3)} ${digits.slice(3, 6)}-${digits.slice(6, 10)} ${digits.slice(10)}`;
};

export default function SubmissionForm({
  submission,
}: {
  submission: SubmissionInputs;
}) {
  const router = useRouter();
  const { polygonCoords } = usePolygon();
  const polyDiv = polygonCoords
    ? polygonCoords.map((polyPoint, index) => {
        return (
          <div className="polycoord" key={index}>
            <span>
              Point {index}: Lat:{polyPoint[0]} | Lng:{polyPoint[1]}
            </span>
          </div>
        );
      })
    : null;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ApprovedSubmission>();
  const onSubmit: SubmitHandler<ApprovedSubmission> = async (data) => {
    data.coords = polygonCoords;
    const submissionResponse = await submissionApproval(data, submission.id);
    router.push("../submissions");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Submitter Name </label>
      <input
        defaultValue={submission.name}
        placeholder="Jane Smith"
        className={errors.name ? "input_error" : ""}
        {...register("name")}
      />

      <label>
        Submitter Email*{" "}
        {errors.email && (
          <span className="form_error">Enter a valid email</span>
        )}
      </label>
      <input
        defaultValue={submission.email}
        placeholder="jane@example.com"
        className={errors.email ? "input_error" : ""}
        {...register("email", {
          required: "Email is required",
          pattern: { value: EMAIL_PATTERN, message: "Enter a valid email" },
        })}
      />

      <label>
        Block Association Name*{" "}
        {errors.block_association_name && (
          <span className="form_error">This field is required</span>
        )}
      </label>
      <input
        defaultValue={submission.block_association_name}
        placeholder="Sunny Side Block Association"
        className={errors.block_association_name ? "input_error" : ""}
        {...register("block_association_name", { required: true })}
      />

      <label>
        Block Association Boundaries*{" "}
        {errors.block_association_boundaries && (
          <span className="form_error">This field is required</span>
        )}
      </label>
      <input
        defaultValue={submission.block_association_boundaries}
        placeholder="From 1st Ave to 3rd Ave between Pine St & Oak St"
        className={errors.block_association_boundaries ? "input_error" : ""}
        {...register("block_association_boundaries", { required: true })}
      />

      <label>
        Block Association Email{" "}
        {errors.block_association_email && (
          <span className="form_error">Enter a valid email</span>
        )}
      </label>
      <input
        defaultValue={submission.block_association_email}
        placeholder="contact@sunnyblock.org"
        className={errors.block_association_email ? "input_error" : ""}
        {...register("block_association_email", {
          pattern: { value: EMAIL_PATTERN, message: "Enter a valid email" },
        })}
      />

      <label>
        Block Association Phone{" "}
        {errors.block_association_phone && (
          <span className="form_error">Check the phone number</span>
        )}
      </label>
      <input
        defaultValue={submission.block_association_phone}
        placeholder="(555) 123-4567"
        className={errors.block_association_phone ? "input_error" : ""}
        {...register("block_association_phone", {
          onBlur: (e) =>
            setValue("block_association_phone", formatPhone(e.target.value)),
          validate: {
            pattern: (val) =>
              val.trim() === "" ||
              /^[0-9()+\-.\s]*$/.test(val) ||
              "Use numbers and phone symbols",
            length: (val) =>
              val.trim() === "" ||
              val.replace(/\D/g, "").length <= 15 ||
              "Phone number is too long",
          },
        })}
      />

      <label>Block Association Website </label>
      <input
        defaultValue={submission.block_association_website}
        placeholder="https://sunnyblock.org"
        className={errors.block_association_website ? "input_error" : ""}
        {...register("block_association_website")}
      />

      <label>Other Info </label>
      <textarea
        defaultValue={submission.other_info}
        placeholder="Any extra context (focus of the association, other contacts, etc.)"
        className={errors.other_info ? "input_error" : ""}
        {...register("other_info")}
      />
      {polyDiv}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      <span></span>
    </form>
  );
}
