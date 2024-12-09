import { cn } from '@/lib/utils';
import React from 'react';
interface Props {
 className?: string 
 children: React.ReactNode
}

export const Container: React.FC<Props> = ({ className, children }) => {
  return (
    <div className={cn("w-[1180px] px-[10] mx-auto",className)} >
        {children}
    </div>
  )
}
