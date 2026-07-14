import styles from './page.module.css'
import Link from 'next/link'

const SERIES = [
  { vol: '01', slug: '01-teacher',  title_en: 'Memory Anchor',       title_ja: '記憶定着術師',       occupation: '学校の先生',   parody: '転生したらスライムだった件', published: true  },
  { vol: '02', slug: '02-stylist',  title_en: 'Shell Transmuter',     title_ja: '外殻変容執行者',     occupation: '美容師',       parody: 'ジョジョの奇妙な冒険 第4部', published: true  },
  { vol: '03', slug: '03-sales',    title_en: 'Negotiation Sorcerer', title_ja: '対人交渉魔導士',     occupation: '営業職',       parody: 'デスノート',                 published: false },
  { vol: '04', slug: '04-conbini',  title_en: 'Midnight Arbiter',     title_ja: '深夜需給調停官',     occupation: 'コンビニ店員', parody: 'エヴァンゲリオン',           published: false },
  { vol: '05', slug: '05-nurse',    title_en: 'Primal Guardian',      title_ja: '原初感情守護者',     occupation: '保育士',       parody: 'ドラゴンボール',             published: false },
  { vol: '06', slug: '06-delivery', title_en: 'Will Messenger',       title_ja: '意志伝達使者',       occupation: '郵便配達員',   parody: '千と千尋の神隠し',           published: false },
  { vol: '07', slug: '07-doctor',   title_en: 'Soma Engineer',        title_ja: '生体機構修復士',     occupation: '医者',         parody: 'Dr.STONE',                  published: false },
  { vol: '08', slug: '08-lawyer',   title_en: 'Codex Executor',       title_ja: '法典解読執行官',     occupation: '弁護士',       parody: 'デスノート',                 published: false },
  { vol: '09', slug: '09-chef',     title_en: 'Five Sense Dominator', title_ja: '五感支配調理術師',   occupation: '料理人',       parody: '食戟のソーマ',               published: false },
  { vol: '10', slug: '10-farmer',   title_en: 'Earth Contractor',     title_ja: '大地契約者',         occupation: '農家',         parody: 'ワンピース',                 published: false },
  { vol: '11', slug: '11-ceo',      title_en: 'Sovereign Strategist', title_ja: '組織存続意思決定者', occupation: '経営者',       parody: 'キングダム',                 published: false },
  { vol: '12', slug: '12-farmer2',  title_en: 'Earth Contractor II',  title_ja: '大地契約者II',       occupation: '農家',         parody: 'ワンピース',                 published: false },
]

export default function HomePage() {
  return (
    <>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLogo}><span>MONJU</span></Link>
        <a href="https://monju.dev" target="_blank" rel="noopener noreferrer" className={styles.navLink}>monju.dev →</a>
      </nav>

      <section id="hero" className={styles.hero}>
        <p className={styles.heroBadge}>職業図鑑：異能者編 — Series by MONJU</p>
        <h1 className={styles.heroTitle}>
          あなたの隣にいる人は、<br />
          <span className={styles.grad}>全員、異能者だった。</span>
        </h1>
        <p className={styles.heroSub}>
          先生も、医者も、コンビニ店員も。<br />
          その「すごさ」に、誰も気づいていないだけだ。
        </p>
        <a href="#series" className={styles.heroCta}>異能者図鑑を見る</a>
        <div className={styles.heroScroll}>
          <span>Scroll</span>
          <div className={styles.heroScrollBar} />
        </div>
      </section>

      <section id="series" className={styles.series}>
        <p className={styles.eyebrow}>// Series</p>
        <h2 className={styles.sectionTitle}>異能者<span className={styles.grad}>図鑑</span></h2>
        <div className={styles.cardsGrid}>
          {SERIES.map(s =>
            s.published ? (
              <Link key={s.slug} href={`/vol/${s.slug}`} className={styles.card}>
                <p className={styles.cardVol}>Vol.{s.vol}</p>
                <p className={styles.cardTitleEn}>{s.title_en}</p>
                <p className={styles.cardTitleJa}>{s.title_ja}</p>
                <p className={styles.cardOccupation}>{s.occupation}</p>
                <p className={styles.cardParody}>Parody: <span className={styles.grad}>{s.parody}</span></p>
                <span className={styles.cardArrow}>↗</span>
              </Link>
            ) : (
              <div key={s.slug} className={`${styles.card} ${styles.comingSoon}`}>
                <p className={styles.cardVol}>Vol.{s.vol}</p>
                <p className={styles.cardTitleEn}>{s.title_en}</p>
                <p className={styles.cardTitleJa}>{s.title_ja}</p>
                <p className={styles.cardOccupation}>{s.occupation}</p>
                <p className={styles.cardParody}>Parody: <span className={styles.grad}>{s.parody}</span></p>
                <span className={styles.comingTag}>Coming Soon</span>
              </div>
            )
          )}
        </div>
      </section>

      <section id="about" className={styles.about}>
        <div className={styles.aboutDivider} />
        <p className={styles.aboutLabel}>// About</p>
        <h2 className={styles.aboutTitle}>このサイトについて</h2>
        <p className={styles.aboutBody}>
          このシリーズは、<strong>MONJU</strong>が制作するWebコンテンツです。<br />
          身近な職業の「すごさ」を、アニメパロディの力を借りて可視化する試みです。<br /><br />
          MONJUは兵庫県を拠点に、<strong>Webサイト制作と業務自動化</strong>を提供しています。<br />
          Webサイトの制作から、予約・問い合わせの自動化まで、一括でお任せいただけます。
        </p>
        <a href="https://monju.dev" target="_blank" rel="noopener noreferrer" className={styles.aboutLink}>
          MONJUについて詳しく
        </a>
      </section>

      <footer className={styles.footer}>
        <p className={styles.footerLogo}><span className={styles.grad}>MONJU</span></p>
        <p className={styles.footerCopy}>© 2026 MONJU. All rights reserved.</p>
      </footer>
    </>
  )
}
