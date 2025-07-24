import ExampleButtonIcon from '@/assets/icons/ExampleButtonIcon'
import { useSimilarProblems } from '@/api'
import { Problem } from '@/api/workbooks/types'
import { ProblemCard, LoadingSpinner } from '../shared'
import SimilarProblemsHeader from './SimilarProblemsHeader'
import { useState, useEffect } from 'react'
import { cva } from 'class-variance-authority'

const panelContainerVariants = cva('flex h-full flex-col')

const centerContentVariants = cva('flex-1 flex-center')

const placeholderMessageVariants = cva('flex flex-col gap-[2px] flex-center')

const messageRowVariants = cva('flex gap-[6px] flex-center')

const messageTextVariants = cva('text-sm text-[#333]')

const problemListVariants = cva('flex-1 overflow-y-auto px-4')

type SimilarProblemsPanelProps = {
  activeProblemId: number | null
  problems: Problem[]
  onAddProblem: (newProblem: Problem, targetProblemId: number) => void
  onSwapProblem: (newProblem: Problem, targetProblemId: number) => void
}

export default function SimilarProblemsPanel({
  activeProblemId,
  problems,
  onAddProblem,
  onSwapProblem
}: SimilarProblemsPanelProps) {
  // 유사문제 리스트 (제거 기능을 위한 로컬 상태)
  const [hiddenProblems, setHiddenProblems] = useState<Set<number>>(new Set())

  // 유사문제 API 호출
  const excludedProblemIds = problems.map((p) => p.id)
  const { data: similarProblems, isLoading } = useSimilarProblems({
    problemId: activeProblemId || 0,
    excludedProblemIds
  })

  // activeProblemId가 변경되면 hidden 문제들 초기화
  useEffect(() => {
    setHiddenProblems(new Set())
  }, [activeProblemId])

  // 추가 핸들러
  const handleAdd = (problem: Problem) => {
    if (activeProblemId) {
      onAddProblem(problem, activeProblemId)
      setHiddenProblems((prev) => new Set([...prev, problem.id]))
    }
  }

  // 교체 핸들러
  const handleSwap = (problem: Problem) => {
    if (activeProblemId) {
      onSwapProblem(problem, activeProblemId)
      setHiddenProblems((prev) => new Set([...prev, problem.id]))
    }
  }

  // 활성화된 문제가 없을 때
  if (!activeProblemId) {
    return (
      <div className={panelContainerVariants()}>
        <SimilarProblemsHeader />
        <div className={centerContentVariants()}>
          <div className={placeholderMessageVariants()}>
            <div className={messageRowVariants()}>
              <ExampleButtonIcon />
              <span className={messageTextVariants()}>버튼을 누르면</span>
            </div>
            <span className={messageTextVariants()}>
              문제를 추가 또는 교체할수 있습니다.
            </span>
          </div>
        </div>
      </div>
    )
  }

  // 로딩 중
  if (isLoading) {
    return (
      <div className={panelContainerVariants()}>
        <SimilarProblemsHeader />
        <div className={centerContentVariants()}>
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  // 표시할 유사문제들 (숨겨진 문제 제외)
  const visibleSimilarProblems =
    similarProblems?.filter((problem) => !hiddenProblems.has(problem.id)) || []

  // 유사문제 리스트 표시
  return (
    <div className={panelContainerVariants()}>
      <SimilarProblemsHeader />
      <div className={problemListVariants()}>
        <div className="flex flex-col gap-4">
          {visibleSimilarProblems.map((problem, index) => (
            <ProblemCard
              key={problem.id}
              index={index}
              problem={problem}
              active={false}
              buttonType="similar"
              onAddSimilar={() => handleAdd(problem)}
              onSwap={() => handleSwap(problem)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
