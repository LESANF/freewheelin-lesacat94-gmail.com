import { cva } from 'class-variance-authority'
import { useProblems } from '@/api'
import { Problem } from '@/api/workbooks/types'
import { useState, useEffect } from 'react'
import { SimilarProblemsPanel, WorkBookProblemsPanel } from './components'

const editorContainerVariants = cva(
  'flex h-screen justify-center gap-4 px-6 py-4'
)

const panelVariants = cva(
  'flex flex-col rounded-2xl overflow-hidden shrink-0',
  {
    variants: {
      type: {
        left: [
          'bg-[#F5F5F5]',
          'w-[480px] min-w-[480px]',
          'desktop:w-[504px] desktop:min-w-[504px]'
        ],
        right: [
          'bg-[#5C5C5C]',
          'w-[480px] min-w-[480px]',
          'desktop:w-[712px] desktop:min-w-[712px]'
        ]
      }
    }
  }
)

export default function WorkBookEditor() {
  const { data: problemsData, isLoading, error } = useProblems()
  const [problems, setProblems] = useState<Problem[]>([])
  const [activeProblemId, setActiveProblemId] = useState<number | null>(null)

  useEffect(() => {
    if (problemsData) {
      setProblems(problemsData)
    }
  }, [problemsData])

  // 유사문제 버튼 클릭 핸들러
  const handleAddSimilar = (problemId: number) => {
    setActiveProblemId(problemId)
  }

  // 삭제 버튼 클릭 핸들러
  const handleDelete = (problemId: number) => {
    setProblems((prev) => {
      const newProblems = prev.filter((problem) => problem.id !== problemId)
      return newProblems
    })

    if (activeProblemId === problemId) {
      setActiveProblemId(null)
    }
  }

  // 문제 추가 핸들러 (유사문제에서 호출)
  const handleAddProblem = (newProblem: Problem, targetProblemId: number) => {
    setProblems((prev) => {
      const targetIndex = prev.findIndex((p) => p.id === targetProblemId)
      const newProblems = [...prev]
      newProblems.splice(targetIndex + 1, 0, newProblem)
      return newProblems
    })
  }

  // 문제 교체 핸들러 (유사문제에서 호출)
  const handleSwapProblem = (newProblem: Problem, targetProblemId: number) => {
    setProblems((prev) =>
      prev.map((p) => (p.id === targetProblemId ? newProblem : p))
    )
    setActiveProblemId(newProblem.id)
  }

  return (
    <div className={editorContainerVariants()}>
      <div className={panelVariants({ type: 'left' })}>
        <SimilarProblemsPanel
          activeProblemId={activeProblemId}
          problems={problems}
          onAddProblem={handleAddProblem}
          onSwapProblem={handleSwapProblem}
        />
      </div>

      <div className={panelVariants({ type: 'right' })}>
        <WorkBookProblemsPanel
          problems={problems}
          activeProblemId={activeProblemId}
          isLoading={isLoading}
          error={error}
          onAddSimilar={handleAddSimilar}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}
