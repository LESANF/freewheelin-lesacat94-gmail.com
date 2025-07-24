import { AddCircleIcon, DeleteIcon, SwapIcon } from '@/assets/icons'
import { cva } from 'class-variance-authority'

const buttonVariants = cva(
  'flex-center gap-1 cursor-pointer transition-colors duration-200 hover:opacity-80',
  {
    variants: {
      active: {
        true: 'text-[#00ABFF]',
        false: 'text-[#959595]'
      }
    },
    defaultVariants: {
      active: false
    }
  }
)

type ButtonState = {
  addSimilar?: boolean
}

type WorkBookButtonLayoutProps = {
  type: 'similar' | 'detail'
  activeStates?: ButtonState
  onAddSimilar?: () => void
  onDelete?: () => void
  onSwap?: () => void
}

export default function WorkBookButtonLayout({
  type,
  activeStates = {},
  onAddSimilar,
  onDelete,
  onSwap
}: WorkBookButtonLayoutProps) {
  const { addSimilar = false } = activeStates

  return (
    <div className="gap-3 flex-center">
      {type === 'detail' && (
        <>
          <button
            className={buttonVariants({ active: addSimilar })}
            onClick={onAddSimilar}
          >
            <AddCircleIcon active={addSimilar} />
            <span className="text-xs font-medium">유사문제</span>
          </button>

          <button
            className={buttonVariants({ active: false })}
            onClick={onDelete}
          >
            <DeleteIcon active={false} />
            <span className="text-xs font-medium">삭제</span>
          </button>
        </>
      )}

      {type === 'similar' && (
        <>
          <button
            className={buttonVariants({ active: false })}
            onClick={onSwap}
          >
            <SwapIcon />
            <span className="text-xs font-medium">교체</span>
          </button>

          <button
            className={buttonVariants({ active: false })}
            onClick={onAddSimilar}
          >
            <AddCircleIcon active={false} />
            <span className="text-xs font-medium">추가</span>
          </button>
        </>
      )}
    </div>
  )
}
