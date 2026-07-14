'use client'

import type { VolData } from '@/types/vol'
import s from '../slide.module.css'

const ROMAN = ['Ⅰ','Ⅱ','Ⅲ','Ⅳ','Ⅴ','Ⅵ']

function parseTags(html: string) {
  return html
    .replace(/<corps>/g, '<span class="tag-corps">').replace(/<\/corps>/g, '</span>')
    .replace(/<danger>/g, '<span class="tag-danger">').replace(/<\/danger>/g, '</span>')
}

export default function SlideSkills({ data }: { data: VolData }) {
  const isJojo4   = data.bg_theme === 'jojo4'
  const isTensura = data.bg_theme === 'tensura'

  return (
    <div id="s2" className={`${s.slide}`} style={{ alignItems: 'stretch', justifyContent: 'flex-start' }}>
      {isTensura && <div className={s.bgTensuraS2}><div className={s.statusGrid} /><div className={s.statusGlow} /></div>}
      {isJojo4   && <div className={s.bgJojoS2}>
        <div className={s.jojoPanel1} />
        <div className={s.jojoPanel2} />
        <div className={s.jojoPanel3} />
        <div className={s.jojoDodoBg}>ドドドドドドドドドド</div>
      </div>}

      <div className={`s2-header ${s.s2Header}`}>
        <span className={s.s2Eyebrow}>{isTensura ? '// ステータスウィンドウ' : '// スタンド能力'}</span>
        <span className={s.s2Title}>{isTensura ? '取 得 ス キ ル 一 覧' : 'ス タ ン ド 能 力 一 覧'}</span>
      </div>

      {isTensura && (
        <div className={s.s2Grid}>
          {data.skills.map((sk, i) => (
            <div key={i} className={`sk ${s.sk}`}>
              <p className={s.skTag}>{sk.tag}</p>
              <p className={s.skName}>{sk.name_en}</p>
              <p className={s.skJa}>{sk.name_ja}</p>
              <p className={s.skBody} dangerouslySetInnerHTML={{ __html: parseTags(sk.body) }} />
              <div className={s.skAcquired}>取得済み ✓</div>
            </div>
          ))}
        </div>
      )}

      {isJojo4 && (
        <div className={s.s2JojoGrid}>
          {data.skills.map((sk, i) => (
            <div key={i} className={s.jojoSkillRow}>
              <div className={s.jsrNum}>{ROMAN[i]}</div>
              <div className={s.jsrBody}>
                <span className={s.jsrTag}>{sk.tag}</span>
                <p className={s.jsrName}>{sk.name_ja}</p>
              </div>
              <div className={s.jsrBadge}>発現済み ✓</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
