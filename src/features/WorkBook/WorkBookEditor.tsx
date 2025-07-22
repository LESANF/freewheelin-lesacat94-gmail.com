import { cva } from 'class-variance-authority'
import { SimilarProblemsPanel, WorkBookProblemsPanel } from './components'

const panelVariants = cva('flex flex-col rounded-2xl', {
  variants: {
    type: {
      left: 'bg-[#F5F5F5] min-w-[480px] desktop:min-w-[504px]',
      right: 'bg-[#5C5C5C] min-w-[480px] desktop:min-w-[712px]'
    }
  }
})

export default function WorkBookEditor() {
  return (
    <div className="flex h-screen justify-center gap-4 overflow-x-auto py-4">
      <div className={panelVariants({ type: 'left' })}>
        <SimilarProblemsPanel />
      </div>

      <div className={panelVariants({ type: 'right' })}>
        <WorkBookProblemsPanel />
      </div>
    </div>
  )
}
