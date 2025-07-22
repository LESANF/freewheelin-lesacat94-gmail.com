import { Link } from 'react-router-dom'
import { cn } from '../utils'

export default function NotFoundPage() {
  return (
    <div
      className={cn(
        'min-h-screen',
        'bg-gray-50',
        'flex items-center justify-center',
        'p-4'
      )}
    >
      <div
        className={cn(
          'text-center',
          'bg-white',
          'rounded-lg shadow-md',
          'p-8 max-w-md w-full'
        )}
      >
        <h1 className={cn('text-6xl font-bold', 'text-gray-800 mb-4')}>404</h1>
        <Link
          to="/"
          className={cn(
            'inline-block',
            'bg-blue-500 hover:bg-blue-600',
            'text-white font-semibold',
            'py-2 px-4 rounded',
            'transition-colors'
          )}
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
