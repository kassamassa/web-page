import { notFound } from 'next/navigation'
import { readFile } from 'fs/promises'
import path from 'path'
import type { VolData } from '@/types/vol'
import VolPage from '@/components/vol/VolPage'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props) {
  try {
    const data = await loadVolData(params.slug)
    return { title: `${data.title_ja.replace(/\s/g, '')} | 職業図鑑：異能者編` }
  } catch {
    return { title: '職業図鑑：異能者編' }
  }
}

async function loadVolData(slug: string): Promise<VolData> {
  const filePath = path.join(process.cwd(), 'data', `${slug}.json`)
  const raw = await readFile(filePath, 'utf-8')
  return JSON.parse(raw)
}

export default async function VolSlugPage({ params }: Props) {
  let data: VolData
  try {
    data = await loadVolData(params.slug)
  } catch {
    notFound()
  }
  return <VolPage data={data} />
}
