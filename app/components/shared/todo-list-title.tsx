import { cn } from "@/lib/utils";
import React from "react";
interface Props {
  className?: string;
  title: string;
}

export const TodoListTitle: React.FC<Props> = ({ className, title }) => {
  return <h1 className={cn("text-[25px] font-medium", className)}>{title}</h1>;
};
