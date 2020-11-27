import { parse } from 'fast-xml-parser'

export async function fetchXml<Response>(url: string): Promise<Response> {
  const res = await fetch(url)
  const txt = await res.text()
  return parse(txt, { ignoreAttributes: false })
}
