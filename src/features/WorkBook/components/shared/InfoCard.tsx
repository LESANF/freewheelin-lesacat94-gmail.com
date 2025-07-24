import { cva } from 'class-variance-authority'

const infoCardVariants = cva(
  'flex h-[25px] w-[40px] items-center justify-center rounded text-xs font-medium bg-[#F5F5F5]',
  {
    variants: {
      color: {
        level1: 'text-[#5C5C5C]', // 하
        level2: 'text-[#00ABFF]', // 중하
        level3: 'text-[#54C0B1]', // 중
        level4: 'text-[#FFC64D]', // 상
        level5: 'text-[#FD5354]', // 최상
        gray: 'text-[#707070]' // 정답률, 유형
      }
    },
    defaultVariants: {
      color: 'gray'
    }
  }
)

type InfoCardProps = {
  children: React.ReactNode
  color?: 'level1' | 'level2' | 'level3' | 'level4' | 'level5' | 'gray'
}

export default function InfoCard({ children, color = 'gray' }: InfoCardProps) {
  return <div className={infoCardVariants({ color })}>{children}</div>
}
