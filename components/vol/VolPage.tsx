'use client'

import { useEffect, useRef } from 'react'
import type { VolData } from '@/types/vol'
import SlideTitle from './slides/SlideTitle'
import SlideMission from './slides/SlideMission'
import SlideSkills from './slides/SlideSkills'
import SlideTimeline from './slides/SlideTimeline'
import SlideReqs from './slides/SlideReqs'
import SlideReveal from './slides/SlideReveal'
import styles from './VolPage.module.css'

function hexToRgb(hex: string): string {
  const h = hex.replace('#', '')
  return `${parseInt(h.slice(0,2),16)},${parseInt(h.slice(2,4),16)},${parseInt(h.slice(4,6),16)}`
}

export default function VolPage({ data }: { data: VolData }) {
  const progressRef  = useRef<HTMLDivElement>(null)
  const slideNumRef  = useRef<HTMLDivElement>(null)
  const scrollHintRef= useRef<HTMLDivElement>(null)
  const scrollerRef  = useRef<HTMLDivElement>(null)
  const loadingRef   = useRef<HTMLDivElement>(null)

  // set CSS vars
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--primary',     data.color_primary)
    root.style.setProperty('--accent',      data.color_accent)
    root.style.setProperty('--primary-rgb', hexToRgb(data.color_primary))
    root.style.setProperty('--accent-rgb',  hexToRgb(data.color_accent))
    // enforce overflow:hidden on body for scroll-snap
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [data])

  // GSAP
  useEffect(() => {
    let cleanup: (() => void) | undefined

    ;(async () => {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const scroller    = scrollerRef.current!
      const progressEl  = progressRef.current!
      const slideNumEl  = slideNumRef.current!
      const hintEl      = scrollHintRef.current!

      ScrollTrigger.scrollerProxy(scroller, {
        scrollTop(v) { if (arguments.length) scroller.scrollTop = v as number; return scroller.scrollTop },
        getBoundingClientRect() { return { top:0, left:0, width:innerWidth, height:innerHeight } },
        pinType: 'transform',
      })
      scroller.addEventListener('scroll', ScrollTrigger.update)
      ScrollTrigger.defaults({ scroller })

      progressEl.style.background = `linear-gradient(to right, ${data.color_primary}, ${data.color_accent})`

      ScrollTrigger.create({
        trigger: '#slides', start: 'top top', end: 'bottom bottom',
        onUpdate(self) {
          progressEl.style.width = (self.progress * 100) + '%'
          const cur = Math.round(self.progress * 5) + 1
          slideNumEl.textContent = String(cur).padStart(2,'0') + ' / 06'
          hintEl.style.opacity = self.progress > 0.05 ? '0' : '1'
        },
      })

      /* S0 enter */
      gsap.set('.s0-en',     { scale:10, opacity:0, filter:'blur(50px) brightness(5)' })
      gsap.set('.s-classify',{ opacity:0, y:30 })
      gsap.set('.s0-ja',     { opacity:0, letterSpacing:'1.5em' })
      gsap.set('.s0-vow',    { opacity:0, y:20 })

      gsap.timeline({ defaults:{ ease:'power4.out' } })
        .to('.s0-en',     { scale:1, opacity:1, filter:'blur(0px) brightness(1)', duration:1.8 }, 0.1)
        .to('.s-classify',{ opacity:1, y:0, duration:0.6 }, 0.6)
        .to('.s0-ja',     { opacity:1, letterSpacing:'0.65em', duration:1 }, 1.1)
        .to('.s0-vow',    { opacity:1, y:0, duration:0.6 }, 1.6)

      /* S0 exit */
      gsap.timeline({ scrollTrigger:{ trigger:'#s0', start:'top top', end:'bottom top', scrub:1.2 } })
        .to('.s0-en',     { scale:18, opacity:0, filter:'blur(60px)', ease:'power3.in' }, 0)
        .to('.s0-ja',     { opacity:0, letterSpacing:'3em', ease:'power2.in' }, 0)
        .to('.s-classify',{ opacity:0, y:-30, ease:'power2.in' }, 0)
        .to('.s0-vow',    { opacity:0, y:-20, ease:'power2.in' }, 0)

      /* S1 enter */
      gsap.set('.s1-label', { opacity:0, x:-40 })
      gsap.set('.s1-kinetic .line-inner', { y:'110%', scale:1.3, filter:'blur(10px)' })
      gsap.set('.s1-sub', { opacity:0, y:40 })
      gsap.timeline({ scrollTrigger:{ trigger:'#s1', start:'top bottom', end:'top top', scrub:1.2 } })
        .to('.s1-label', { opacity:1, x:0, duration:0.2 })
        .to('.s1-kinetic .line-inner', { y:'0%', scale:1, filter:'blur(0px)', duration:0.5, stagger:0.1, ease:'power3.out' }, '<0.1')
        .to('.s1-sub', { opacity:1, y:0, duration:0.3 }, '<0.3')

      /* S1 exit */
      gsap.timeline({ scrollTrigger:{ trigger:'#s1', start:'bottom bottom', end:'bottom top', scrub:1.2 } })
        .to('.s1-kinetic', { scale:0.05, opacity:0, filter:'blur(30px)', ease:'power3.in' }, 0)
        .to('.s1-sub',     { opacity:0, y:-50, ease:'power2.in' }, 0)
        .to('.s1-label',   { opacity:0, x:50,  ease:'power2.in' }, 0)

      /* S2 enter */
      gsap.set('.s2-header', { opacity:0, y:20 })
      gsap.timeline({ scrollTrigger:{ trigger:'#s2', start:'top bottom', end:'top top', scrub:1.2 } })
        .to('.s2-header', { opacity:1, y:0, duration:0.25 })
        .to('.sk', { opacity:1, scale:1, translateZ:0, duration:0.4, stagger:{ amount:0.5, from:'start' }, ease:'back.out(1.5)' }, '<0.1')

      /* S3 enter */
      gsap.set('.s3-label', { opacity:0, x:-40 })
      gsap.timeline({ scrollTrigger:{ trigger:'#s3', start:'top bottom', end:'top top', scrub:1.2 } })
        .to('.s3-label', { opacity:1, x:0, duration:0.2 })
        .to('.tl-row', { opacity:1, x:0, duration:0.35, stagger:0.07, ease:'power2.out' }, '<0.1')

      /* S4 enter */
      gsap.set('.s4-label',   { opacity:0, x:-40 })
      gsap.set('.req-kinetic',{ opacity:0, scale:0.4 })
      gsap.timeline({ scrollTrigger:{ trigger:'#s4', start:'top bottom', end:'top top', scrub:1.2 } })
        .to('.s4-label',   { opacity:1, x:0, duration:0.2 })
        .to('.req-row',    { opacity:1, x:0, duration:0.35, stagger:0.08, ease:'power2.out' }, '<0.15')
        .to('.req-kinetic',{ opacity:1, scale:1, duration:0.4, ease:'elastic.out(1,.7)' }, '<0.5')

      /* S5 enter */
      gsap.set('.s5-big',  { scale:20, opacity:0, filter:'blur(80px) brightness(6)' })
      gsap.set('.s5-pre',  { opacity:0, y:30 })
      gsap.set('.s5-body', { opacity:0, y:30 })
      gsap.set('.s5-ja',   { opacity:0, letterSpacing:'1.5em' })
      gsap.set('.s5-vow',  { opacity:0, y:20 })
      gsap.set(['.s5-next','.s5-cta'], { opacity:0, y:20 })
      gsap.timeline({ scrollTrigger:{ trigger:'#s5', start:'top bottom', end:'top top', scrub:1.2 } })
        .to('.s5-pre',  { opacity:1, y:0, duration:0.15 })
        .to('.s5-body', { opacity:1, y:0, duration:0.2 }, '<0.05')
        .to('.s5-big',  { scale:1, opacity:1, filter:'blur(0px) brightness(1)', duration:0.5, ease:'power4.out' }, '<0.1')
        .to('.s5-ja',   { opacity:1, letterSpacing:'0.3em', duration:0.3 }, '<0.35')
        .to('.s5-vow',  { opacity:1, y:0, duration:0.2 }, '<0.1')
        .to('.s5-next', { opacity:1, y:0, duration:0.2 }, '<0.05')
        .to('.s5-cta',  { opacity:1, y:0, duration:0.3 }, '<0.1')

      ScrollTrigger.refresh()

      // ローディング非表示
      setTimeout(() => {
        if (loadingRef.current) {
          loadingRef.current.style.opacity = '0'
          loadingRef.current.style.pointerEvents = 'none'
        }
      }, 500)

      cleanup = () => {
        ScrollTrigger.getAll().forEach(t => t.kill())
        scroller.removeEventListener('scroll', ScrollTrigger.update)
      }
    })().catch(() => {
      // GSAP失敗時もローディングを消す
      if (loadingRef.current) {
        loadingRef.current.style.opacity = '0'
        loadingRef.current.style.pointerEvents = 'none'
      }
    })

    return () => cleanup?.()
  }, [data])

  return (
    <>
      <div ref={loadingRef} className={styles.loading} style={{ transition: 'opacity 0.6s' }}>
        <span>DECRYPTING...</span>
      </div>
      <div ref={progressRef} className={styles.progress} />
      <div ref={slideNumRef} className={styles.slideNum}>01 / 06</div>
      <div ref={scrollHintRef} className={styles.scrollHint}>
        <span>Scroll</span>
        <div className={styles.scrollBar} />
      </div>

      <div ref={scrollerRef} className={styles.scrollContainer}>
        <div id="slides" className={styles.slides}>
          <SlideTitle data={data} />
          <SlideMission data={data} />
          <SlideSkills data={data} />
          <SlideTimeline data={data} />
          <SlideReqs data={data} />
          <SlideReveal data={data} />
        </div>
      </div>
    </>
  )
}
