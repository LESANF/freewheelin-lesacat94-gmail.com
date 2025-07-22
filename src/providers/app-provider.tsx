import { type ReactNode } from 'react'
import { ReactQueryProvider } from './react-query-provider'

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>
}
