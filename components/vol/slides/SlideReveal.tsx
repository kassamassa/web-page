'use client'

import { useEffect, useRef } from 'react'
import type { VolData } from '@/types/vol'
import s from '../slide.module.css'
import Link from 'next/link'

function parseTags(html: string) {
  return html
    .replace(/<corps>/g, '<span class="tag-corps">').replace(/<\/corps>/g, '</span>')
    .replace(/<danger>/g, '<span class="tag-danger">').replace(/<\/danger>/g, '</span>')
    .replace(/<strong>/g, '<strong>').replace(/<\/strong>/g, '</strong>')
}

export default function SlideReveal({ data }: { data: VolData }) {
  const isJojo4   = data.bg_theme === 'jojo4'
  const isTensura = data.bg_theme === 'tensura'
  const cvRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!isJojo4) return
    const cv = cvRef.current
    if (!cv) return
    const cx = cv.getContext('2d')!
    let W = 0, H = 0, raf = 0
    const resize = () => { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight }
    resize(); const ro = new ResizeObserver(resize); ro.observe(cv)

    const particles = Array.from({ length: 120 }, (_, i) => ({
      angle: Math.random() * Math.PI * 2, r: 100 + Math.random() * 200,
      speed: 0.002 + Math.random() * .008, size: Math.random() * 3 + 0.5,
      col: i % 2 === 0 ? '155,89,182' : '241,196,15', alpha: 0.2 + Math.random() * .4,
    }))

    let t = 0
    const loop = () => {
      t += .01; cx.clearRect(0, 0, W, H)
      cx.fillStyle = '#0A0008'; cx.fillRect(0, 0, W, H)
      const cx2 = W / 2, cy2 = H / 2
      particles.forEach(p => {
        p.angle += p.speed
        const x = cx2 + Math.cos(p.angle) * p.r * (0.8 + 0.2 * Math.sin(t * 2 + p.angle))
        const y = cy2 + Math.sin(p.angle) * p.r * (0.8 + 0.2 * Math.cos(t * 1.5 + p.angle))
        const pulse = 0.5 + 0.5 * Math.sin(t * 3 + p.angle)
        const g = cx.createRadialGradient(x, y, 0, x, y, p.size * 6)
        g.addColorStop(0, `rgba(${p.col},${p.alpha * pulse})`); g.addColorStop(1, `rgba(${p.col},0)`)
        cx.beginPath(); cx.arc(x, y, p.size * 6, 0, Math.PI * 2); cx.fillStyle = g; cx.fill()
      })
      const glow = cx.createRadialGradient(cx2, cy2, 0, cx2, cy2, 150)
      glow.addColorStop(0, `rgba(155,89,182,${0.1 + 0.05 * Math.sin(t)})`); glow.addColorStop(1, 'rgba(155,89,182,0)')
      cx.fillStyle = glow; cx.fillRect(0, 0, W, H)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [isJojo4])

  return (
    <div id="s5" className={`${s.slide} ${isJojo4 ? s.jojo4Reveal : ''}`}>
      {isTensura && <div className={s.bgTensuraS5}><div className={s.portalRing} /><div className={s.portalRing2} /></div>}
      {isJojo4 && <div className={s.bgJojoS5}>
        <canvas ref={cvRef} />
        <div className={s.jojoStandRing} />
        <div className={s.jojoStandRing2} />
      </div>}

      {isJojo4 && <>
        <div className={s.jojoTone} />
        <div className={s.jojoFrame} />
        <div className={`${s.jojoDiamond} ${s.diaTl}`}>♦ ♦ ♦</div>
        <div className={`${s.jojoDiamond} ${s.diaBr}`}>♦ ♦ ♦</div>
        <div className={`${s.jojoSfx} ${s.sfxDodo}`}>やれやれだぜ</div>
      </>}

      <p className={`s5-pre ${s.s5Pre}`}>// 正体判明</p>
      {isTensura && <p className={`s5-body ${s.s5Body}`} dangerouslySetInnerHTML={{ __html: parseTags(data.reveal.pre_text) }} />}
      <p className={`s5-big ${s.s5Big}`}>{data.reveal.occupation_en}</p>
      <p className={`s5-ja ${s.s5Ja}`}>{data.reveal.occupation_ja}</p>
      <p className={`s5-vow ${s.s5Vow}`}>{data.reveal.vow}</p>
      <Link href={`/vol/${data.reveal.next_slug}`} className={`s5-next ${s.s5Next}`}>
        Next Vol.{data.reveal.next_vol} · {data.reveal.next_name}
      </Link>
      <a href="https://monju.dev" target="_blank" rel="noopener noreferrer" className={`s5-cta ${s.s5Cta}`}>
        凡庸な日常を、心揺さぶる物語に変える。<br />
        <span>Web制作のご相談はこちら →</span>
      </a>
    </div>
  )
}
