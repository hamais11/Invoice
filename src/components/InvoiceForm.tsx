"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import CompanyInfoForm from "./CompanyInfoForm";
import ClientDetailsForm from "./ClientDetailsForm";
import InvoiceItemsForm from "./InvoiceItemsForm";
import PaymentTermsForm from "./PaymentTermsForm";

interface CompanyInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  logo?: string;
}

interface ClientDetails {
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  clientCity: string;
  clientState: string;
  clientZip: string;
  clientCountry: string;
  clientPhone: string;
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

interface PaymentTerms {
  dueDate: string;
  paymentTerms: string;
  notes: string;
}

interface InvoiceData {
  companyInfo: CompanyInfo;
  clientDetails: ClientDetails;
  invoiceItems: InvoiceItem[];
  paymentTerms: PaymentTerms;
  invoiceNumber: string;
  invoiceDate: string;
}

interface InvoiceFormProps {
  onUpdate?: (data: InvoiceData) => void;
  initialData?: Partial<InvoiceData>;
}

const InvoiceForm = ({ onUpdate, initialData = {} }: InvoiceFormProps) => {
  const [activeTab, setActiveTab] = useState("company");
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    companyInfo: {
      name: "Your Company Name",
      address: "123 Business Street",
      city: "City",
      state: "State",
      zip: "12345",
      country: "Country",
      phone: "(555) 123-4567",
      email: "contact@yourcompany.com",
      website: "www.yourcompany.com",
      logo: "",
    },
    clientDetails: {
      clientName: "Client Name",
      clientEmail: "client@example.com",
      clientAddress: "456 Client Avenue",
      clientCity: "Client City",
      clientState: "Client State",
      clientZip: "54321",
      clientCountry: "Client Country",
      clientPhone: "(555) 987-6543",
    },
    invoiceItems: [
      {
        id: "1",
        description: "Website Design",
        quantity: 1,
        price: 500,
        total: 500,
      },
      {
        id: "2",
        description: "Development Hours",
        quantity: 10,
        price: 75,
        total: 750,
      },
    ],
    paymentTerms: {
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      paymentTerms: "net30",
      notes: "Please make payment by the due date.",
    },
    invoiceNumber: `INV-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`,
    invoiceDate: new Date().toISOString().split("T")[0],
    ...initialData,
  });

  const updateCompanyInfo = (companyInfo: CompanyInfo) => {
    const updatedData = { ...invoiceData, companyInfo };
    setInvoiceData(updatedData);
    onUpdate?.(updatedData);
  };

  const updateClientDetails = (field: string, value: string) => {
    const updatedClientDetails = {
      ...invoiceData.clientDetails,
      [field]: value,
    };
    const updatedData = {
      ...invoiceData,
      clientDetails: updatedClientDetails,
    };
    setInvoiceData(updatedData);
    onUpdate?.(updatedData);
  };

  const updateInvoiceItems = (items: InvoiceItem[]) => {
    const updatedData = { ...invoiceData, invoiceItems: items };
    setInvoiceData(updatedData);
    onUpdate?.(updatedData);
  };

  const updatePaymentTerms = (field: string, value: string) => {
    const updatedPaymentTerms = {
      ...invoiceData.paymentTerms,
      [field]: value,
    };
    const updatedData = {
      ...invoiceData,
      paymentTerms: updatedPaymentTerms,
    };
    setInvoiceData(updatedData);
    onUpdate?.(updatedData);
  };

  const handleNextTab = () => {
    if (activeTab === "company") setActiveTab("client");
    else if (activeTab === "client") setActiveTab("items");
    else if (activeTab === "items") setActiveTab("payment");
  };

  const handlePrevTab = () => {
    if (activeTab === "payment") setActiveTab("items");
    else if (activeTab === "items") setActiveTab("client");
    else if (activeTab === "client") setActiveTab("company");
  };

  return (
    <Card className="w-full bg-background shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create Invoice</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="company">Company Info</TabsTrigger>
            <TabsTrigger value="client">Client Details</TabsTrigger>
            <TabsTrigger value="items">Invoice Items</TabsTrigger>
            <TabsTrigger value="payment">Payment Terms</TabsTrigger>
          </TabsList>

          <TabsContent value="company" className="space-y-4">
            <CompanyInfoForm
              onUpdate={updateCompanyInfo}
              initialData={invoiceData.companyInfo}
            />
          </TabsContent>

          <TabsContent value="client" className="space-y-4">
            <ClientDetailsForm
              {...invoiceData.clientDetails}
              onChange={updateClientDetails}
            />
          </TabsContent>

          <TabsContent value="items" className="space-y-4">
            <InvoiceItemsForm
              items={invoiceData.invoiceItems}
              onItemsChange={updateInvoiceItems}
            />
          </TabsContent>

          <TabsContent value="payment" className="space-y-4">
            <PaymentTermsForm
              {...invoiceData.paymentTerms}
              onChange={updatePaymentTerms}
            />
          </TabsContent>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrevTab}
              disabled={activeTab === "company"}
            >
              Previous
            </Button>
            <Button onClick={handleNextTab} disabled={activeTab === "payment"}>
              Next
            </Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InvoiceForm;
