type base = {
  number: string
  local_format: string
  international_format: string
  country_prefix: string
  country_code: string
  country_name: string
  location: string
  carrier: string
  line_type: string|null
}

export type Data = base & {
  valid: boolean
}

export type StoredData = base & {
  _id?: string
  valid: number
}
