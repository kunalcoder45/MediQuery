import React, { ReactNode } from "react";
import {
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";  // Radix dialog import

interface AccessibleDialogProps {
  title: string;
  children: ReactNode;
}

export function AccessibleDialog({ title, children }: AccessibleDialogProps) {
  return (
    <DialogContent>
      <DialogTitle>{title}</DialogTitle>
      {children}
    </DialogContent>
  );
}
