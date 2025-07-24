import { useProblems } from '@/api'
import { Problem } from '@/api/workbooks/types'
import { useState, useEffect } from 'react'
import WorkBookProblemsFooter from './WorkBookProblemsFooter'
import WorkBookProblemsHeader from './WorkBookProblemsHeader'
import WorkBookProblemsList from './WorkBookProblemsList'

export default function WorkBookProblemsPanel() {
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
    console.log('유사문제 조회:', problemId)
  }

  // 삭제 버튼 클릭 핸들러
  const handleDelete = (problemId: number) => {
    setProblems((prev) => {
      const newProblems = prev.filter((problem) => problem.id !== problemId)

      if (activeProblemId === problemId) {
        setActiveProblemId(null)

        console.log('유사문제 리스트 비움')
      }

      return newProblems
    })
  }

  // 버튼 활성화 상태 계산
  const getButtonStates = (problemId: number) => ({
    addSimilar: activeProblemId === problemId,
    delete: false,
    swap: false
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
      <div className="flex h-full flex-col">
        <WorkBookProblemsHeader />
        <div className="flex-1 flex-center">
          <div className="size-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
        <WorkBookProblemsFooter footerData={emptyFooterData} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full flex-col">
        <WorkBookProblemsHeader />
        <div className="flex-1 flex-center">
          <p className="text-center text-sm text-[#FD5354]">
            오류가 발생했습니다.
          </p>
        </div>
        <WorkBookProblemsFooter footerData={emptyFooterData} />
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <WorkBookProblemsHeader />
      <WorkBookProblemsList
        problems={problems}
        activeProblemId={activeProblemId}
        onAddSimilar={handleAddSimilar}
        onDelete={handleDelete}
        getButtonStates={getButtonStates}
      />
      <WorkBookProblemsFooter footerData={footerData} />
    </div>
  )
}
