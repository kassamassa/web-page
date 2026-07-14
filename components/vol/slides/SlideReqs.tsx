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

export default function SlideReqs({ data }: { data: VolData }) {
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

    const rows = 8; let t = 0
    const loop = () => {
      t += .015; cx.clearRect(0, 0, W, H)
      cx.fillStyle = '#0A0008'; cx.fillRect(0, 0, W, H)
      for (let row = 0; row < rows; row++) {
        const y = (row / rows) * H + (t * 20) % (H / rows)
        const offset = row % 2 === 0 ? 0 : W * .1
        const size = 30 + 10 * Math.sin(t + row)
        cx.font = `900 ${size}px serif`
        cx.fillStyle = `rgba(155,89,182,${0.04 + 0.02 * Math.sin(t * 1.5 + row)})`
        cx.fillText('ゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴ', offset - ((t * 30) % 200), y)
      }
      for (let i = 0; i < 8; i++) {
        const x = (i / 8) * W + Math.sin(t * .5 + i) * 20
        cx.beginPath(); cx.moveTo(x, -50); cx.lineTo(x + 100, H + 50)
        cx.strokeStyle = `rgba(241,196,15,${0.03 + 0.02 * Math.sin(t + i)})`
        cx.lineWidth = 1; cx.stroke()
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [isJojo4])

  return (
    <div id="s4" className={`${s.slide} ${isJojo4 ? s.jojo4Req : ''}`}>
      {isTensura && <div className={s.bgTensuraS4} />}
      {isJojo4   && <div className={s.bgJojoS4}><canvas ref={cvRef} /></div>}

      {isJojo4 && <>
        <div className={s.jojoTone} />
        <div className={s.jojoFrame} />
        <div className={`${s.jojoDiamond} ${s.diaTl}`}>♦ ♦ ♦</div>
        <div className={`${s.jojoDiamond} ${s.diaBr}`}>♦ ♦ ♦</div>
        <div className={`${s.jojoSfx} ${s.sfxBaki}`}>ゴゴゴゴゴ</div>
      </>}

      <p className={`s4-label ${s.s4Label}`}>// {isTensura ? '種族進化条件' : 'スタンド使い適性'}</p>
      <div className={`${s.reqStack}`}>
        {data.requirements.map((r, i) => (
          <div key={i} className={`req-row ${s.reqRow}`}>
            <span className={`req-num ${s.reqNum}`}>{['I','II','III','IV'][i]}</span>
            <div>
              <p className={`req-head ${s.reqHead}`}>{r.head}</p>
              {isTensura && <p className={`req-body ${s.reqBody}`} dangerouslySetInnerHTML={{ __html: parseTags(r.body) }} />}
            </div>
          </div>
        ))}
      </div>

      {isJojo4 ? (
        <div className={s.jojoVowCenter}>
          <p className={s.jojoVowText}>{data.vow}</p>
        </div>
      ) : (
        <p className={`req-kinetic ${s.reqKinetic}`}>— {data.vow}</p>
      )}
    </div>
  )
}
