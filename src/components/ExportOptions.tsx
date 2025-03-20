import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Download, Mail, FileText } from "lucide-react";

interface ExportOptionsProps {
  isOpen?: boolean;
  onClose?: () => void;
  onExportPdf?: () => void;
  onSendEmail?: (email: string, message: string) => void;
}

const ExportOptions = ({
  isOpen = true,
  onClose = () => {},
  onExportPdf = () => {},
  onSendEmail = () => {},
}: ExportOptionsProps) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    "Please find the attached invoice for your review.",
  );

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendEmail(email, message);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Export Invoice
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="pdf" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pdf" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              PDF
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pdf" className="py-4">
            <div className="space-y-4">
              <div className="text-center p-6 border rounded-md bg-muted/30">
                <FileText className="h-16 w-16 mx-auto text-primary/70 mb-2" />
                <p className="text-sm text-muted-foreground">
                  Your invoice will be exported as a PDF file that you can
                  download, print, or share.
                </p>
              </div>

              <DialogFooter>
                <Button onClick={onExportPdf} className="w-full" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </DialogFooter>
            </div>
          </TabsContent>

          <TabsContent value="email" className="py-4">
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Recipient Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="client@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <textarea
                  id="message"
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[100px]"
                  placeholder="Add a message to your client..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <DialogFooter>
                <Button type="submit" className="w-full" size="lg">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Invoice
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ExportOptions;
