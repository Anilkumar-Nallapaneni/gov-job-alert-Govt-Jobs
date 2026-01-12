export type GovtJob = {
  title: string
  department: string
  vacancies: number | string
  lastDate: string
  salary?: string
  qualifications: string[]
  applicationLink?: string
}

export type StateGovtJobs = {
  id: string // state code like 'MH'
  stateName: string
  jobs: GovtJob[]
}

export default GovtJob
