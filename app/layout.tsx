import type { Metadata } from 'next'
import { Cinzel, Noto_Serif_JP, Space_Mono } from 'next/font/google'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-cinzel',
})
const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-noto',
  preload: false,
})
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: '職業図鑑：異能者編 | MONJU',
  description: '身近な職業の「すごさ」を、アニメパロディの力を借りて可視化するWebコンテンツ。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${cinzel.variable} ${notoSerifJP.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
