import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CalendarIcon } from "lucide-react";

interface PaymentTermsFormProps {
  dueDate?: string;
  paymentTerms?: string;
  notes?: string;
  onChange?: (field: string, value: string) => void;
}

const PaymentTermsForm = ({
  dueDate = "",
  paymentTerms = "net30",
  notes = "",
  onChange = () => {},
}: PaymentTermsFormProps) => {
  const handleChange = (field: string, value: string) => {
    onChange(field, value);
  };

  return (
    <div className="space-y-4 p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
      <h3 className="text-lg font-medium">Payment Terms</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="payment-terms">Payment Terms</Label>
          <Select
            value={paymentTerms}
            onValueChange={(value) => handleChange("paymentTerms", value)}
          >
            <SelectTrigger id="payment-terms">
              <SelectValue placeholder="Select payment terms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Due Immediately</SelectItem>
              <SelectItem value="net7">Net 7 Days</SelectItem>
              <SelectItem value="net15">Net 15 Days</SelectItem>
              <SelectItem value="net30">Net 30 Days</SelectItem>
              <SelectItem value="net60">Net 60 Days</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="due-date">Due Date</Label>
          <div className="relative">
            <Input
              id="due-date"
              type="date"
              value={dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
              className="w-full"
            />
            <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          placeholder="Enter any additional payment instructions or terms..."
          value={notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default PaymentTermsForm;
