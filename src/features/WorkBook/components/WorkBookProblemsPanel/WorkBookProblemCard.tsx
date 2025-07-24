import { Problem } from '@/api/workbooks/types'
import { cva } from 'class-variance-authority'
import WorkBookButtonLayout from '../WorkBookButtonLayout'

const cardVariants = cva(
  'flex flex-col overflow-hidden rounded-xl border-[3px]',
  {
    variants: {
      active: {
        true: 'border-[#00ABFF]',
        false: 'border-transparent'
      }
    },
    defaultVariants: {
      active: false
    }
  }
)

// 난이도별 글자색 매핑
const levelColors = {
  1: '#5C5C5C', // 하
  2: '#00ABFF', // 중하
  3: '#54C0B1', // 중
  4: '#FFC64D', // 상
  5: '#FD5354' // 최상
} as const

// 난이도별 텍스트 매핑
const levelTexts = {
  1: '하',
  2: '중하',
  3: '중',
  4: '상',
  5: '최상'
} as const

// 문제 유형 텍스트 매핑
const typeTexts = {
  1: '객관식',
  2: '주관식'
} as const

type ButtonStates = {
  addSimilar: boolean
  delete: boolean
  swap: boolean
}

function InfoCard({
  children,
  textColor = '#707070'
}: {
  children: React.ReactNode
  textColor?: string
}) {
  return (
    <div
      className="flex h-[20px] w-[40px] rounded-[4px] bg-[#F5F5F5] text-xs font-normal flex-center"
      style={{ color: textColor }}
    >
      {children}
    </div>
  )
}

export default function WorkBookProblemCard({
  index,
  problem,
  active = false,
  buttonStates,
  onAddSimilar,
  onDelete
}: {
  index: number
  problem: Problem
  active?: boolean
  buttonStates?: ButtonStates
  onAddSimilar?: () => void
  onDelete?: () => void
}) {
  return (
    <div className={cardVariants({ active })}>
      <div className="flex h-[52px] items-center justify-between bg-[#FAFAFA] px-6 py-3">
        <div className="flex min-w-0 flex-1 items-center">
          <span className="text-xl font-bold text-[#333]">{index + 1}</span>
          <span className="ml-8 truncate text-sm text-[#333]">
            {problem.title}
          </span>
        </div>
        <WorkBookButtonLayout
          type="detail"
          activeStates={buttonStates}
          onAddSimilar={onAddSimilar}
          onDelete={onDelete}
        />
      </div>

      <div className="bg-white px-4 py-6">
        <div className="flex gap-[15px]">
          <div className="flex flex-col gap-1">
            <InfoCard textColor={levelColors[problem.level]}>
              {levelTexts[problem.level]}
            </InfoCard>

            <InfoCard textColor="#707070">{problem.answerRate}%</InfoCard>

            <InfoCard textColor="#707070">{typeTexts[problem.type]}</InfoCard>
          </div>

          <div className="flex-1">
            <div className="flex h-[280px] items-start justify-start rounded bg-white">
              <img
                src={problem.problemImageUrl}
                alt={problem.title}
                className="max-h-full rounded object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
