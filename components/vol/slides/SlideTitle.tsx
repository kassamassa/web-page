'use client'

import { useEffect, useRef } from 'react'
import type { VolData } from '@/types/vol'
import s from '../slide.module.css'

export default function SlideTitle({ data }: { data: VolData }) {
  const isJojo4   = data.bg_theme === 'jojo4'
  const isTensura = data.bg_theme === 'tensura'
  const cvRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = cvRef.current
    if (!cv) return
    const cx = cv.getContext('2d')!
    let W = 0, H = 0, raf = 0

    const resize = () => { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(cv)

    if (isTensura) {
      // 転生パーティクル
      const particles = Array.from({ length: 150 }, (_, i) => ({
        x: Math.random(), y: Math.random(),
        r: Math.random() * 1.5 + .3,
        vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .15,
        ph: Math.random() * Math.PI * 2, sp: .5 + Math.random() * 1.5,
        col: i % 3 === 0 ? '123,158,255' : i % 3 === 1 ? '255,208,96' : '220,230,255',
      }))
      const pillars = Array.from({ length: 5 }, (_, i) => ({ x: .15 + i * .18, ph: i * 1.2, w: .03 + Math.random() * .04 }))
      let t = 0
      const loop = () => {
        t += .01; cx.clearRect(0, 0, W, H)
        cx.fillStyle = '#04040E'; cx.fillRect(0, 0, W, H)
        pillars.forEach(p => {
          const pulse = .5 + .5 * Math.sin(t * .4 + p.ph)
          const g = cx.createLinearGradient(p.x * W, 0, p.x * W, H)
          g.addColorStop(0, 'rgba(123,158,255,0)')
          g.addColorStop(.3, `rgba(123,158,255,${.1 * pulse})`)
          g.addColorStop(.6, `rgba(255,208,96,${.06 * pulse})`)
          g.addColorStop(1, 'rgba(123,158,255,0)')
          const w = p.w * W * pulse
          cx.fillStyle = g
          cx.beginPath()
          cx.moveTo(p.x * W - w * .2, 0); cx.lineTo(p.x * W + w * .2, 0)
          cx.lineTo(p.x * W + w, H); cx.lineTo(p.x * W - w, H)
          cx.closePath(); cx.fill()
        })
        particles.forEach(p => {
          p.x += p.vx / W + Math.sin(t + p.ph) * .0002
          p.y += p.vy / H + Math.cos(t * .6 + p.ph) * .0001
          if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0
          if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0
          const tw = .3 + .7 * Math.sin(t * p.sp + p.ph)
          const px = p.x * W, py = p.y * H
          const g = cx.createRadialGradient(px, py, 0, px, py, p.r * 5)
          g.addColorStop(0, `rgba(${p.col},${tw * .6})`); g.addColorStop(1, `rgba(${p.col},0)`)
          cx.beginPath(); cx.arc(px, py, p.r * 5, 0, Math.PI * 2); cx.fillStyle = g; cx.fill()
          cx.beginPath(); cx.arc(px, py, p.r, 0, Math.PI * 2); cx.fillStyle = `rgba(${p.col},${tw * .9})`; cx.fill()
        })
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    } else if (isJojo4) {
      // ドドドパーティクル
      const cols = Math.floor(innerWidth / 60)
      const drops = Array.from({ length: cols }, () => ({
        y: Math.random() * -100, speed: 0.3 + Math.random() * 0.8,
        char: ['ド','ゴ','ズ','バ','ギ'][Math.floor(Math.random() * 5)],
        size: 20 + Math.random() * 30, alpha: 0.03 + Math.random() * 0.06,
      }))
      const particles = Array.from({ length: 80 }, (_, i) => ({
        x: Math.random(), y: Math.random(), r: Math.random() * 2 + 0.5,
        vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .2,
        ph: Math.random() * Math.PI * 2,
        col: i % 3 === 0 ? '155,89,182' : i % 3 === 1 ? '241,196,15' : '200,150,220',
      }))
      let t = 0
      const loop = () => {
        t += .012; cx.clearRect(0, 0, W, H)
        cx.fillStyle = '#0A0008'; cx.fillRect(0, 0, W, H)
        drops.forEach((d, i) => {
          cx.font = `900 ${d.size}px serif`
          cx.fillStyle = `rgba(155,89,182,${d.alpha})`
          cx.fillText(d.char, i * (W / cols), d.y)
          d.y += d.speed; if (d.y > H + 50) d.y = -50
        })
        particles.forEach(p => {
          p.x += p.vx / W; p.y += p.vy / H
          if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0
          if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0
          const tw = .5 + .5 * Math.sin(t + p.ph)
          const px = p.x * W, py = p.y * H
          const g = cx.createRadialGradient(px, py, 0, px, py, p.r * 8)
          g.addColorStop(0, `rgba(${p.col},${tw * .4})`); g.addColorStop(1, `rgba(${p.col},0)`)
          cx.beginPath(); cx.arc(px, py, p.r * 8, 0, Math.PI * 2); cx.fillStyle = g; cx.fill()
        })
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }

    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [isTensura, isJojo4])

  return (
    <div id="s0" className={`${s.slide} ${isJojo4 ? s.jojo4Title : ''}`}>
      {isTensura && <div className={s.bgTensuraS0}><canvas ref={cvRef} /></div>}
      {isJojo4   && <div className={s.bgJojoS0}><canvas ref={cvRef} /></div>}

      {isJojo4 && <>
        <div className={s.jojoTone} />
        <div className={s.jojoFrame} />
        <div className={`${s.jojoDiamond} ${s.diaTl}`}>♦ ♦ ♦</div>
        <div className={`${s.jojoDiamond} ${s.diaBr}`}>♦ ♦ ♦</div>
        <div className={`${s.jojoSfx} ${s.sfxDodo}`}>ドドドドドドド</div>
      </>}

      <p className={`s-classify ${s.classify}`}>{data.classify}</p>
      {isJojo4 && <p className={s.jojoStandAnnounce}>── スタンド発現 ──</p>}
      <p className={`s0-ja ${s.s0Ja}`} dangerouslySetInnerHTML={{ __html: data.title_ja }} />
      <p className={`s0-vow ${s.s0Vow}`}>{data.vow}</p>
    </div>
  )
}
