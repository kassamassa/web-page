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

export default function SlideTimeline({ data }: { data: VolData }) {
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
      t += .01; cx.clearRect(0, 0, W, H)
      cx.fillStyle = '#9B59B6'; cx.fillRect(0, 0, W, H)
      for (let i = 0; i < 30; i++) {
        const y = Math.random() * H, len = 100 + Math.random() * 300, x = Math.random() * W
        cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x + len, y)
        cx.strokeStyle = `rgba(0,0,0,${0.05 + 0.1 * Math.random()})`
        cx.lineWidth = 1 + Math.random() * 3; cx.stroke()
      }
      cx.font = `900 ${60 + 20 * Math.sin(t)}px serif`
      cx.fillStyle = 'rgba(0,0,0,0.05)'
      cx.fillText('ゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴ', 0, H * .5)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [isJojo4])

  return (
    <div id="s3" className={`${s.slide} ${s.s3Slide}`}>
      {isTensura && <div className={s.bgTensuraS3}><div className={s.logLines} /><div className={s.logGlow} /></div>}
      {isJojo4   && <div className={s.bgJojoS3}><canvas ref={cvRef} /></div>}
      {isJojo4 && <>
        <div className={`${s.jojoSfx} ${s.sfxMenu}`}>ザワ…ザワ…</div>
        <div className={`${s.jojoDiamond} ${s.diaBr}`}>♦ ♦ ♦</div>
      </>}

      <p className={`s3-label ${s.s3Label}`}>// {isTensura ? '冒険記録' : '覚醒の記録'}</p>
      <div className={`${s.tlWrap} ${isJojo4 ? s.jojo4Tl : ''}`}>
        {data.timeline.map((t, i) => (
          <div key={i} className={`tl-row ${s.tlRow}`}>
            <span className={`tl-t ${s.tlT}`}>{t.time}</span>
            <div className={`tl-content ${s.tlContent}`}>
              <p className={`tl-head ${s.tlHead}`}>{t.head}</p>
              {isTensura && <p className={`tl-body ${s.tlBody}`} dangerouslySetInnerHTML={{ __html: parseTags(t.body) }} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
