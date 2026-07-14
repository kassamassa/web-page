export type Skill = {
  tag: string
  name_en: string
  name_ja: string
  body: string
}

export type TimelineItem = {
  time: string
  head: string
  body: string
}

export type Requirement = {
  head: string
  body: string
}

export type VolData = {
  vol: string
  slug: string
  occupation: string
  title_en: string
  title_ja: string
  classify: string
  vow: string
  parody: string
  bg_theme: 'tensura' | 'jojo4'
  color_primary: string
  color_accent: string
  mission: {
    label: string
    headline: string[]
    headline_accent_from: number
    body: string
  }
  skills: Skill[]
  timeline: TimelineItem[]
  requirements: Requirement[]
  reveal: {
    pre_text: string
    occupation_en: string
    occupation_ja: string
    vow: string
    next_vol: string
    next_slug: string
    next_name: string
  }
  wings: boolean
}
