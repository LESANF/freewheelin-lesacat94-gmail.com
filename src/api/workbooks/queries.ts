import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../client'
import type { Problem, SimilarProblemsParams } from './types'

// 문제 리스트 조회
export const useProblems = () => {
  return useQuery({
    queryKey: ['problems'],
    queryFn: async (): Promise<Problem[]> => {
      const response = await apiClient.get<Problem[]>('/problems')
      return response.data
    },
    staleTime: 1000 * 60 * 5 // 5분
  })
}

// 유사문제 리스트 조회
export const useSimilarProblems = ({
  problemId,
  excludedProblemIds
}: SimilarProblemsParams) => {
  const excludedIds = excludedProblemIds.join(',')

  return useQuery({
    queryKey: ['similarProblems', problemId, excludedIds],
    queryFn: async (): Promise<Problem[]> => {
      const response = await apiClient.get<Problem[]>(
        `/problems/${problemId}/similarity?excludedProblemIds=${excludedIds}`
      )
      return response.data
    },
    enabled: !!problemId && excludedProblemIds.length > 0,
    staleTime: 1000 * 60 * 10 // 10분
  })
}
