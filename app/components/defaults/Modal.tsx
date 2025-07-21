"use client";

import { Dialog, DialogOverlay, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ANIMATION_DURATION = 200;

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsOpen(false);
      // Wait for the exit animation to finish before navigating back.
      setTimeout(() => {
        router.back();
      }, ANIMATION_DURATION);
    }
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogTitle></DialogTitle>
      <DialogOverlay>
        <DialogContent className="overflow-y-scroll h-[80vh]">{children}</DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
