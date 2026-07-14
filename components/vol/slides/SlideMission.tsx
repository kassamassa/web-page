'use client'

import { useEffect, useRef } from 'react'
import type { VolData } from '@/types/vol'
import s from '../slide.module.css'

function parseTags(html: string) {
  return html
    .replace(/<corps>/g, '<span class="tag-corps">').replace(/<\/corps>/g, '</span>')
    .replace(/<danger>/g, '<span class="tag-danger">').replace(/<\/danger>/g, '</span>')
    .replace(/<strong>/g, '<strong>').replace(/<\/strong>/g, '</strong>')
}

export default function SlideMission({ data }: { data: VolData }) {
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

    let t = 0
    const loop = () => {
      t += .008; cx.clearRect(0, 0, W, H)
      cx.fillStyle = '#F1C40F'; cx.fillRect(0, 0, W, H)
      const cx2 = W / 2, cy2 = H / 2
      for (let i = 0; i < 120; i++) {
        const angle = (i / 120) * Math.PI * 2
        const pulse = 0.3 + 0.2 * Math.sin(t * 2 + i * .1)
        const x1 = cx2 + Math.cos(angle) * 80, y1 = cy2 + Math.sin(angle) * 80
        const x2 = cx2 + Math.cos(angle) * Math.max(W, H) * 1.5
        const y2 = cy2 + Math.sin(angle) * Math.max(W, H) * 1.5
        cx.beginPath(); cx.moveTo(x1, y1); cx.lineTo(x2, y2)
        cx.strokeStyle = `rgba(0,0,0,${pulse})`
        cx.lineWidth = i % 3 === 0 ? 2 : 0.8; cx.stroke()
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [isJojo4])

  return (
    <div id="s1" className={`${s.slide} ${isJojo4 ? s.jojo4Mission : ''}`}>
      {isTensura && <div className={s.bgWall}><div className={s.wallBlocks} /><div className={s.wallGlow} /></div>}
      {isJojo4   && <div className={s.bgJojoS1}><canvas ref={cvRef} /></div>}
      {isJojo4 && <>
        <div className={s.jojoHatch} />
        <div className={s.jojoFrame} />
        <div className={`${s.jojoDiamond} ${s.diaTl}`}>♦ ♦ ♦</div>
      </>}

      <p className={`s1-label ${s.s1Label}`}>// {isTensura ? '転生記録' : '覚醒記録'}</p>
      <div className={s.s1Scene}>
        <div className={`s1-kinetic ${s.s1Kinetic}`} id="s1-kinetic">
          {data.mission.headline.map((w, i) => (
            <span key={i} className={`line ${s.line}`}>
              <span className={`line-inner ${s.lineInner} ${i >= data.mission.headline_accent_from ? s.accent : ''}`}>{w}</span>
            </span>
          ))}
        </div>
        <p className={`s1-sub ${s.s1Sub}`} dangerouslySetInnerHTML={{ __html: parseTags(data.mission.body) }} />
      </div>
    </div>
  )
}
