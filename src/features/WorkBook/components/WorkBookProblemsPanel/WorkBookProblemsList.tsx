import { Problem } from '@/api/workbooks/types'
import WorkBookProblemCard from './WorkBookProblemCard'

type ButtonStates = {
  addSimilar: boolean
  delete: boolean
  swap: boolean
}

export default function WorkBookProblemsList({
  problems,
  activeProblemId,
  onAddSimilar,
  onDelete,
  getButtonStates
}: {
  problems?: Problem[]
  activeProblemId?: number | null
  onAddSimilar?: (problemId: number) => void
  onDelete?: (problemId: number) => void
  getButtonStates?: (problemId: number) => ButtonStates
}) {
  if (!problems || problems.length === 0) {
    return (
      <div className="flex-1 flex-center">
        <p className="text-center text-sm text-white">
          학습지 문제수가 없습니다.
          <br />
          다음단계로 넘어가기 위해 문제를 추가해주세요.
        </p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto px-4">
      <div className="flex flex-col gap-4">
        {problems.map((problem, index) => (
          <WorkBookProblemCard
            key={problem.id}
            index={index}
            problem={problem}
            active={activeProblemId === problem.id}
            buttonStates={getButtonStates?.(problem.id)}
            onAddSimilar={() => onAddSimilar?.(problem.id)}
            onDelete={() => onDelete?.(problem.id)}
          />
        ))}
      </div>
    </div>
  )
}
