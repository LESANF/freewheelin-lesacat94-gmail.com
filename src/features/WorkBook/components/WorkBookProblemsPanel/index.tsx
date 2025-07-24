import { Problem } from '@/api/workbooks/types'
import { LoadingSpinner } from '../shared'
import WorkBookProblemsFooter from './WorkBookProblemsFooter'
import WorkBookProblemsHeader from './WorkBookProblemsHeader'
import WorkBookProblemsList from './WorkBookProblemsList'
import { cva } from 'class-variance-authority'

const panelContainerVariants = cva('flex h-full flex-col')

const centerContentVariants = cva('flex-1 flex-center')

const errorMessageVariants = cva('text-center text-sm text-[#FD5354]')

type WorkBookProblemsPanelProps = {
  problems: Problem[]
  activeProblemId: number | null
  isLoading: boolean
  error: Error | null
  onAddSimilar: (problemId: number) => void
  onDelete: (problemId: number) => void
}

export default function WorkBookProblemsPanel({
  problems,
  activeProblemId,
  isLoading,
  error,
  onAddSimilar,
  onDelete
}: WorkBookProblemsPanelProps) {
  // 버튼 활성화 상태 계산
  const getButtonStates = (problemId: number) => ({
    addSimilar: activeProblemId === problemId
  })

  // 난이도별 문제 개수 계산
  const levelCounts = problems.reduce(
    (acc, problem) => {
      acc[problem.level] = (acc[problem.level] || 0) + 1
      return acc
    },
    {} as Record<number, number>
  )

  const footerData = {
    totalCount: problems.length,
    levelCounts: {
      level1: levelCounts[1] || 0, // 하
      level2: levelCounts[2] || 0, // 중하
      level3: levelCounts[3] || 0, // 중
      level4: levelCounts[4] || 0, // 상
      level5: levelCounts[5] || 0 // 최상
    }
  }

  // 빈 데이터 (로딩/에러 상태용)
  const emptyFooterData = {
    totalCount: 0,
    levelCounts: {
      level1: 0,
      level2: 0,
      level3: 0,
      level4: 0,
      level5: 0
    }
  }

  if (isLoading) {
    return (
      <div className={panelContainerVariants()}>
        <WorkBookProblemsHeader />
        <div className={centerContentVariants()}>
          <LoadingSpinner />
        </div>
        <WorkBookProblemsFooter footerData={emptyFooterData} />
      </div>
    )
  }

  if (error) {
    return (
      <div className={panelContainerVariants()}>
        <WorkBookProblemsHeader />
        <div className={centerContentVariants()}>
          <p className={errorMessageVariants()}>오류가 발생했습니다.</p>
        </div>
        <WorkBookProblemsFooter footerData={emptyFooterData} />
      </div>
    )
  }

  return (
    <div className={panelContainerVariants()}>
      <WorkBookProblemsHeader />
      <WorkBookProblemsList
        problems={problems}
        activeProblemId={activeProblemId}
        onAddSimilar={onAddSimilar}
        onDelete={onDelete}
        getButtonStates={getButtonStates}
      />
      <WorkBookProblemsFooter footerData={footerData} />
    </div>
  )
}
