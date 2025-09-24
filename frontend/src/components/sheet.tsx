import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";

interface SheetProps {
  title?: string;
  children: ReactNode;
  trigger?: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

export function Sheet({ children, trigger }: Omit<SheetProps, "title" | "side" | "className">) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <button>Open Sheet</button>}
      </DialogTrigger>
      {children}
    </Dialog>
  );
}

export function SheetTrigger({ children, ...props }: { children: ReactNode }) {
  return <DialogTrigger asChild {...props}>{children}</DialogTrigger>;
}

export function SheetContent({ 
  children, 
  title,
  side = "right",
  className = "",
}: SheetProps) {
  // Apply appropriate positioning classes based on the side prop
  const sideClasses = {
    top: "inset-x-0 top-0 border-b",
    right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
    bottom: "inset-x-0 bottom-0 border-t",
    left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
  };

  const positionClass = sideClasses[side];

  return (
    <DialogContent className={`fixed z-50 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out ${positionClass} ${className}`}>
      {title && <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>}
      {children}
    </DialogContent>
  );
}