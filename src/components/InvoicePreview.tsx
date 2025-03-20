import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Download, Printer } from "lucide-react";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

interface CompanyInfo {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  email: string;
  phone: string;
  logo?: string;
}

interface ClientDetails {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  email: string;
  phone: string;
}

interface PaymentTerms {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  notes: string;
}

interface InvoicePreviewProps {
  companyInfo?: CompanyInfo;
  clientDetails?: ClientDetails;
  invoiceItems?: InvoiceItem[];
  paymentTerms?: PaymentTerms;
  subtotal?: number;
  taxRate?: number;
  taxAmount?: number;
  total?: number;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({
  companyInfo = {
    name: "Acme Inc.",
    address: "123 Business Street",
    city: "San Francisco",
    postalCode: "94103",
    country: "USA",
    email: "billing@acmeinc.com",
    phone: "+1 (555) 123-4567",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=acme",
  },
  clientDetails = {
    name: "Client Company Ltd.",
    address: "456 Client Avenue",
    city: "New York",
    postalCode: "10001",
    country: "USA",
    email: "accounts@clientcompany.com",
    phone: "+1 (555) 987-6543",
  },
  invoiceItems = [
    {
      id: "1",
      description: "Website Design",
      quantity: 1,
      price: 1200,
      total: 1200,
    },
    {
      id: "2",
      description: "Logo Design",
      quantity: 1,
      price: 600,
      total: 600,
    },
    {
      id: "3",
      description: "Hosting (Annual)",
      quantity: 1,
      price: 300,
      total: 300,
    },
  ],
  paymentTerms = {
    invoiceNumber: "INV-2023-001",
    invoiceDate: "2023-06-01",
    dueDate: "2023-06-30",
    notes:
      "Payment due within 30 days. Please make payment to the bank account details provided separately.",
  },
  subtotal = 2100,
  taxRate = 10,
  taxAmount = 210,
  total = 2310,
}) => {
  return (
    <div className="bg-background h-full w-full overflow-auto p-6">
      <Card className="w-full mx-auto max-w-4xl bg-white">
        <CardHeader className="flex flex-row justify-between items-start">
          <div>
            {companyInfo.logo && (
              <div className="mb-4">
                <img
                  src={companyInfo.logo}
                  alt="Company Logo"
                  className="h-16 w-16 rounded-md"
                />
              </div>
            )}
            <CardTitle className="text-2xl font-bold text-primary">
              INVOICE
            </CardTitle>
            <div className="mt-2 text-sm text-muted-foreground">
              <p className="font-semibold">{companyInfo.name}</p>
              <p>{companyInfo.address}</p>
              <p>
                {companyInfo.city}, {companyInfo.postalCode}
              </p>
              <p>{companyInfo.country}</p>
              <p>{companyInfo.email}</p>
              <p>{companyInfo.phone}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-sm">Invoice Number</p>
            <p className="text-lg font-bold">{paymentTerms.invoiceNumber}</p>
            <div className="mt-2">
              <p className="text-sm">
                <span className="font-semibold">Date:</span>{" "}
                {paymentTerms.invoiceDate}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Due Date:</span>{" "}
                {paymentTerms.dueDate}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Bill To:</h3>
            <div className="text-sm">
              <p className="font-semibold">{clientDetails.name}</p>
              <p>{clientDetails.address}</p>
              <p>
                {clientDetails.city}, {clientDetails.postalCode}
              </p>
              <p>{clientDetails.country}</p>
              <p>{clientDetails.email}</p>
              <p>{clientDetails.phone}</p>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-muted rounded-t-md p-3 grid grid-cols-12 font-semibold text-sm">
              <div className="col-span-6">Description</div>
              <div className="col-span-2 text-right">Quantity</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <div className="border-x border-b rounded-b-md">
              {invoiceItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 p-3 text-sm border-b last:border-b-0"
                >
                  <div className="col-span-6">{item.description}</div>
                  <div className="col-span-2 text-right">{item.quantity}</div>
                  <div className="col-span-2 text-right">
                    ${item.price.toFixed(2)}
                  </div>
                  <div className="col-span-2 text-right font-medium">
                    ${item.total.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <div className="w-64">
              <div className="flex justify-between py-2">
                <span className="text-sm">Subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm">Tax ({taxRate}%):</span>
                <span className="font-medium">${taxAmount.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between py-2">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-lg">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {paymentTerms.notes && (
            <div className="mt-8 p-4 bg-muted/50 rounded-md text-sm">
              <h4 className="font-semibold mb-1">Notes:</h4>
              <p>{paymentTerms.notes}</p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InvoicePreview;
