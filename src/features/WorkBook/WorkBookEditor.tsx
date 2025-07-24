import { cva } from 'class-variance-authority'
import { SimilarProblemsPanel, WorkBookProblemsPanel } from './components'

const panelVariants = cva(
  'flex flex-col rounded-2xl overflow-hidden flex-shrink-0',
  {
    variants: {
      type: {
        left: 'bg-[#F5F5F5] w-[480px] desktop:w-[504px] min-w-[480px] desktop:min-w-[504px]',
        right:
          'bg-[#5C5C5C] w-[480px] desktop:w-[712px] min-w-[480px] desktop:min-w-[712px]'
      }
    }
  }
)

export default function WorkBookEditor() {
  return (
    <div className="flex h-screen justify-center gap-4 px-6 py-4">
      <div className={panelVariants({ type: 'left' })}>
        <SimilarProblemsPanel />
      </div>

      <div className={panelVariants({ type: 'right' })}>
        <WorkBookProblemsPanel />
      </div>
    </div>
  )
}
