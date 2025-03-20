"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface ConfirmationScreenProps {
  isOpen?: boolean;
  onClose?: () => void;
  onCreateNew?: () => void;
  onReturn?: () => void;
  title?: string;
  description?: string;
  actionType?: "email" | "pdf";
}

export default function ConfirmationScreen({
  isOpen = true,
  onClose = () => {},
  onCreateNew = () => {},
  onReturn = () => {},
  title = "Invoice Successfully Processed",
  description = "Your invoice has been successfully processed.",
  actionType = "pdf",
}: ConfirmationScreenProps) {
  const [open, setOpen] = useState(isOpen);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleCreateNew = () => {
    setOpen(false);
    onCreateNew();
  };

  const handleReturn = () => {
    setOpen(false);
    onReturn();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-background">
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription className="mt-2">
            {description}
            {actionType === "pdf" ? (
              <span className="block mt-2">Your PDF is ready to download.</span>
            ) : (
              <span className="block mt-2">
                Your invoice has been sent to the client.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-3 sm:justify-center mt-4">
          <Button onClick={handleCreateNew} className="w-full">
            Create Another Invoice
          </Button>
          <Button onClick={handleReturn} variant="outline" className="w-full">
            Return to Dashboard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
