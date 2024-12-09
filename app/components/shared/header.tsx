import { cn } from "@/lib/utils";
import React from "react";
interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("shadow-sm text-center p-3", className)}>
      <p className="text-[35px]  hover:opacity-50 transition-all ease-in-out cursor-pointer">javaCode - test</p>
    </div>
  );
};
