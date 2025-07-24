import React from 'react'
import { cva } from 'class-variance-authority'

const footerTextVariants = cva('tracking-[-1%]', {
  variants: {
    state: {
      empty: 'font-bold text-[#FD5354]',
      normal: 'text-[#C0C0C0]',
      count: 'text-white'
    }
  }
})

type FooterData = {
  totalCount: number
  levelCounts: {
    level1: number // 하
    level2: number // 중하
    level3: number // 중
    level4: number // 상
    level5: number // 최상
  }
}

export default function WorkBookProblemsFooter({
  footerData
}: {
  footerData?: FooterData
}) {
  // footerData가 없거나 총 개수가 0이면 빨간색 텍스트 표시
  const isEmpty = !footerData || footerData.totalCount === 0

  return (
    <div className="flex h-[64px] w-full justify-end px-5 py-6">
      {isEmpty ? (
        <span className={footerTextVariants({ state: 'empty' })}>
          문제 수 0 개
        </span>
      ) : (
        <span className={footerTextVariants({ state: 'normal' })}>
          하{footerData.levelCounts.level1} · 중하
          {footerData.levelCounts.level2} · 중{footerData.levelCounts.level3} ·
          상{footerData.levelCounts.level4} · 최상
          {footerData.levelCounts.level5} |{' '}
          <span className={footerTextVariants({ state: 'count' })}>
            문제 수 {footerData.totalCount} 개
          </span>
        </span>
      )}
    </div>
  )
}
