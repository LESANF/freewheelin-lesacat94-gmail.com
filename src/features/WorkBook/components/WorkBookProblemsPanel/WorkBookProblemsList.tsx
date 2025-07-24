import { Problem } from '@/api/workbooks/types'
import { ProblemCard } from '../shared'
import { cva } from 'class-variance-authority'

const emptyStateVariants = cva('flex-1 flex-center')

const emptyMessageVariants = cva('text-center text-sm text-white')

const listContainerVariants = cva('flex-1 overflow-y-auto px-4')

const problemGridVariants = cva('flex flex-col gap-4')

type WorkBookProblemsListProps = {
  problems: Problem[]
  activeProblemId: number | null
  onAddSimilar: (problemId: number) => void
  onDelete: (problemId: number) => void
  getButtonStates: (problemId: number) => {
    addSimilar: boolean
  }
}

export default function WorkBookProblemsList({
  problems,
  activeProblemId,
  onAddSimilar,
  onDelete,
  getButtonStates
}: WorkBookProblemsListProps) {
  if (!problems || problems.length === 0) {
    return (
      <div className={emptyStateVariants()}>
        <p className={emptyMessageVariants()}>
          학습지 문제수가 없습니다.
          <br />
          다음단계로 넘어가기 위해 문제를 추가해주세요.
        </p>
      </div>
    )
  }

  return (
    <div className={listContainerVariants()}>
      <div className={problemGridVariants()}>
        {problems.map((problem, index) => (
          <ProblemCard
            key={problem.id}
            index={index}
            problem={problem}
            active={activeProblemId === problem.id}
            buttonType="detail"
            buttonStates={getButtonStates(problem.id)}
            onAddSimilar={() => onAddSimilar(problem.id)}
            onDelete={() => onDelete(problem.id)}
          />
        ))}
      </div>
    </div>
  )
}
