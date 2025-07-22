import { cn } from '../../utils'
import { SimilarProblemsPanel, WorkBookProblemsPanel } from './components'

export default function WorkBookEditor() {
  return (
    <div className={cn('h-screen flex', 'bg-gray-100')}>
      <div className={cn('w-1/2 border-r border-gray-300', 'bg-white')}>
        <SimilarProblemsPanel />
      </div>

      <div className={cn('w-1/2', 'bg-gray-50')}>
        <WorkBookProblemsPanel />
      </div>
    </div>
  )
}
