import { cn } from '../utils'
import { WorkBookEditor } from '../features'

export default function HomePage() {
  return (
    <div>
      <h1 className={cn('text-3xl font-bold', 'text-gray-900 mb-4')}>
        FreeWheelin
      </h1>
      <WorkBookEditor />
    </div>
  )
}
