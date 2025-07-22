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
          'w-full max-w-md p-8'
        )}
      >
        <h1 className={cn('text-6xl font-bold', 'mb-4 text-gray-800')}>404</h1>
        <Link
          to="/"
          className={cn(
            'inline-block',
            'bg-blue-500 hover:bg-blue-600',
            'font-semibold text-white',
            'rounded px-4 py-2',
            'transition-colors'
          )}
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
