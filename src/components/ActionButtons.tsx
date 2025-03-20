import React, { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { Save, FileDown, Mail, Eye } from "lucide-react";

interface ActionButtonsProps {
  onSaveDraft?: () => void;
  onPreview?: () => void;
  onExportPdf?: () => void;
  onEmailClient?: () => void;
}

const ActionButtons = ({
  onSaveDraft = () => console.log("Save draft clicked"),
  onPreview = () => console.log("Preview clicked"),
  onExportPdf = () => console.log("Export PDF clicked"),
  onEmailClient = () => console.log("Email client clicked"),
}: ActionButtonsProps) => {
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  return (
    <div className="w-full bg-background p-4 border-t flex justify-between items-center gap-4">
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onSaveDraft}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save Draft
        </Button>
        <Button
          variant="outline"
          onClick={onPreview}
          className="flex items-center gap-2"
        >
          <Eye className="h-4 w-4" />
          Preview
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          variant="secondary"
          onClick={onExportPdf}
          className="flex items-center gap-2"
        >
          <FileDown className="h-4 w-4" />
          Export PDF
        </Button>

        <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="default"
              className="flex items-center gap-2"
              onClick={onEmailClient}
            >
              <Mail className="h-4 w-4" />
              Email to Client
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">
                Email Invoice to Client
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Recipient Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border rounded-md"
                    placeholder="client@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full p-2 border rounded-md"
                    placeholder="Invoice #1234 from Your Company"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="w-full p-2 border rounded-md h-24"
                    placeholder="Please find attached the invoice for your recent purchase."
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setExportDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button>Send Email</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ActionButtons;
