
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSubmissions } from "@/lib/db";
import SubmissionsPageButtons from "./SubmissionsPageButtons";
import Link from "next/link";

export default async function Page() {
    const supabase = await createClient();
    
      const { data, error } = await supabase.auth.getClaims();
      if (error || !data?.claims) {
        redirect("/auth/login");
      }
      
      const submissions = await getSubmissions()
      
      return (
        <main className="general_main submission_main">
            <h1>Process Submissions</h1>
            <span>Note: Removing submissions doesn't delete the entry, just removes it from this list.</span>
              <SubmissionsPageButtons submissions={submissions} />
        </main>
      )
}