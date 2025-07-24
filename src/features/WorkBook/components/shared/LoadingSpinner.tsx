import { cva } from 'class-variance-authority'

const spinnerVariants = cva(
  'animate-spin rounded-full border-4 border-t-transparent',
  {
    variants: {
      size: {
        sm: 'size-6',
        md: 'size-8',
        lg: 'size-12'
      },
      color: {
        blue: 'border-blue-500',
        gray: 'border-gray-500',
        white: 'border-white'
      }
    },
    defaultVariants: {
      size: 'md',
      color: 'blue'
    }
  }
)

type LoadingSpinnerProps = {
  size?: 'sm' | 'md' | 'lg'
  color?: 'blue' | 'gray' | 'white'
}

export default function LoadingSpinner({
  size = 'md',
  color = 'blue'
}: LoadingSpinnerProps) {
  return <div className={spinnerVariants({ size, color })} />
}
