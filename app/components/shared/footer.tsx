import { cn } from "@/lib/utils";
import React from "react";
interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  return <footer className={cn("bg-black", className)}><div className="p-3 text-center font-bold text-white">FOOTER</div></footer>;
};
