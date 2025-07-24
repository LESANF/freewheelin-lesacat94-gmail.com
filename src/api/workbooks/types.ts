export interface Problem {
  id: number
  level: 1 | 2 | 3 | 4 | 5 // 난이도 (1:하, 2:중하, 3:중, 4:상, 5:최상)
  type: 1 | 2 // 1: 객관식, 2: 주관식
  problemImageUrl: string // 문제 이미지 경로
  title: string // 문제 제목
  answerRate: number // 정답률
}

export interface SimilarProblemsParams {
  problemId: number
  excludedProblemIds: number[]
}
