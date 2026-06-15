export interface Block {
    name: string,
    boundaries: string,
    email: string,
    phone: string,
    website: string,
    id: string,
    coords: Array<L.LatLngExpression>,
    updated_at: number
}
export interface Submissions{
  submissions: Array<SubmissionInputs>
}
export interface SubmissionInputs {
  id: number,
  name: string,
  email: string,
  block_association_name: string,
  block_association_email: string,
  block_association_website: string,
  block_association_phone: string,
  block_association_boundaries: string,
  other_info: string
}

export interface ApprovedSubmission extends SubmissionInputs {
  coords: Array<L.LatLngExpression>,
  is_active: boolean
}