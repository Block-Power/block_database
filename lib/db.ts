import { createClient, createAuthClient } from '@/lib/supabase/client'
import { QueryData } from '@supabase/supabase-js'
import { ApprovedSubmission, SubmissionInputs } from './definitions'


export async function getBlockAssociations() {
  const supabase = createClient()
  const block_association_query = supabase.from('block_associations').select()
  type BlockAssociations = QueryData<typeof block_association_query>

  const { data, error } = await block_association_query
  if (error) throw error
  const block_associations: BlockAssociations = data
  
  return block_associations
} 

export async function blockAssociationSubmission(formData : SubmissionInputs) {
  const supabase = createClient()
  const response = await supabase.from('submissions').insert({
    name: formData.name,
    email: formData.email,
    block_association_name: formData.block_association_name,
    block_association_email: formData.block_association_email,
    block_association_website: formData.block_association_website,
    block_association_phone: formData.block_association_phone,
    block_association_boundaries: formData.block_association_boundaries,
    other_info: formData.other_info
  }
  )
  console.log(response)
}

export async function submissionApproval(formData : ApprovedSubmission, submissionId: number) {
  const supabase = createClient()
  const {data,error} = await supabase.from('block_associations').insert({
      name: formData.block_association_name,
      email: formData.block_association_email,
      website: formData.block_association_website,
      phone: formData.block_association_phone,
      boundaries: formData.block_association_boundaries,
      coords: formData.coords
    }
  ).select()

  if(data) {
    
    const hideResponse = await hideSubmission(submissionId)

    if(hideResponse.data){
      return data
    }
    else {
      throw hideResponse.error
    }
  }
  else {
    throw error
  }
}

export async function hideSubmission(submissionId: number) {
  const supabase = createClient()
  const response = await supabase.from('submissions').update({"show": false}).eq("id", submissionId).select()
  return response
    
}

export async function getSubmissions() {
  const supabase = createClient()
  const { data, error} = await supabase.from('submissions').select().eq("show", true)
  if (data) {return data}
  else {throw error}
}

export async function getSubmission(submissionId: number) {
  const supabase = createClient()
  const {  data,error } = await supabase.from('submissions').select().eq("id", submissionId)

  if (data) {return data[0]}
  else {throw error}
}
