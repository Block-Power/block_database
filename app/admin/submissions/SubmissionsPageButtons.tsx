'use client'
import { hideSubmission } from "@/lib/db";
import Link from "next/link";
import { useState, useEffect } from 'react';



export default function SubmissionsPageButtons({submissions} : {submissions: any[] }) {
    const [subs, setSubs] = useState(submissions);
    

    const hide_submission = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const subId: number = Number(event.currentTarget.dataset.id);
        const response = await hideSubmission(subId);
        const updatedSubs = subs.filter(submission => submission.id !== subId)
        setSubs(updatedSubs);
    }

    const subsBlock = subs.map((submission, index) => {
        const subId = submission.id
        const subURL = "/admin/submissions/" + subId
        return (
            <div className="submission_container"  key={index}>
                <Link className="submission_button submission_main_button" href={subURL}>
                <h3>{submission.block_association_name}</h3>
                <span>Submitted by: {submission.name}</span>
                
                </Link>
                <button className="submission_button submission_hide_button" 
                        data-id={subId} 
                        onClick={hide_submission}
                        >Remove</button>
            </div>
        )
      })
    return (
        <section className="submissions_list">
            {subsBlock}
        </section>

    )

    }