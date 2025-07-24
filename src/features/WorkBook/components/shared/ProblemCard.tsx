import { Problem } from '@/api/workbooks/types'
import { cva } from 'class-variance-authority'
import WorkBookButtonLayout from '../WorkBookButtonLayout'
import InfoCard from './InfoCard'

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

const headerVariants = cva(
  'flex h-[52px] items-center justify-between px-6 py-3',
  {
    variants: {
      type: {
        detail: 'bg-[#FAFAFA]',
        similar: 'bg-[#FAFAFA]'
      }
    },
    defaultVariants: {
      type: 'detail'
    }
  }
)

// 난이도별 color variant 매핑
const levelColorMap = {
  1: 'level1',
  2: 'level2',
  3: 'level3',
  4: 'level4',
  5: 'level5'
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
}

export default function ProblemCard({
  index,
  problem,
  active = false,
  buttonType = 'detail',
  buttonStates,
  onAddSimilar,
  onDelete,
  onSwap
}: {
  index: number
  problem: Problem
  active?: boolean
  buttonType?: 'detail' | 'similar'
  buttonStates?: ButtonStates
  onAddSimilar?: () => void
  onDelete?: () => void
  onSwap?: () => void
}) {
  // similar 타입일 때는 모든 버튼 회색, detail 타입일 때는 전달받은 addSimilar 사용
  const finalButtonStates =
    buttonType === 'similar'
      ? { addSimilar: false }
      : { addSimilar: buttonStates?.addSimilar || false }

  return (
    <div className={cardVariants({ active })}>
      <div className={headerVariants({ type: buttonType })}>
        <div className="flex min-w-0 flex-1 items-center">
          <span className="text-xl font-bold text-[#333]">{index + 1}</span>
          <span className="ml-8 truncate text-sm text-[#333]">
            {problem.title}
          </span>
        </div>
        <WorkBookButtonLayout
          type={buttonType}
          activeStates={finalButtonStates}
          onAddSimilar={onAddSimilar}
          onDelete={onDelete}
          onSwap={onSwap}
        />
      </div>

      <div className="bg-white px-4 py-6">
        <div className="flex gap-[15px]">
          <div className="flex flex-col gap-1">
            <InfoCard color={levelColorMap[problem.level]}>
              {levelTexts[problem.level]}
            </InfoCard>

            <InfoCard color="gray">{problem.answerRate}%</InfoCard>

            <InfoCard color="gray">{typeTexts[problem.type]}</InfoCard>
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
