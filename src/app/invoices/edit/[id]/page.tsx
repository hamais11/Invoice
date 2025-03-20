"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import InvoiceForm from "@/components/InvoiceForm";
import InvoicePreview from "@/components/InvoicePreview";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";

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

interface PaymentTerms {
  dueDate: string;
  paymentTerms: string;
  notes: string;
  discountType: string;
  discountValue: number;
}

interface InvoiceData {
  companyInfo: CompanyInfo;
  clientDetails: ClientDetails;
  invoiceItems: InvoiceItem[];
  paymentTerms: PaymentTerms;
  invoiceNumber: string;
  invoiceDate: string;
}

const EditInvoicePage = () => {
  const params = useParams();
  const router = useRouter();
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the invoice from an API
    // For now, we'll simulate by getting it from localStorage
    const storedInvoices = localStorage.getItem("invoices");
    if (storedInvoices) {
      const invoices = JSON.parse(storedInvoices);
      const foundInvoice = invoices.find((inv: any) => inv.id === params.id);

      if (foundInvoice) {
        // This is a simplified version - in a real app, you'd have the full invoice data
        // Here we're creating mock data based on the limited info we have
        const mockInvoiceData: InvoiceData = {
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
            logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=company",
          },
          clientDetails: {
            clientName: foundInvoice.clientName,
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
            dueDate: foundInvoice.dueDate,
            paymentTerms: "net30",
            notes: "Please make payment by the due date.",
            discountType: "none",
            discountValue: 0,
          },
          invoiceNumber: foundInvoice.invoiceNumber,
          invoiceDate: foundInvoice.invoiceDate,
        };

        setInvoiceData(mockInvoiceData);
      }
    }
    setLoading(false);
  }, [params.id]);

  const handleInvoiceUpdate = (data: InvoiceData) => {
    setInvoiceData(data);
  };

  const handleSaveInvoice = () => {
    if (!invoiceData) return;

    // Calculate invoice totals
    const subtotal = invoiceData.invoiceItems.reduce(
      (sum, item) => sum + item.total,
      0,
    );
    const taxRate = 10; // 10%
    const taxAmount = subtotal * (taxRate / 100);

    // Calculate discount
    let discountAmount = 0;
    if (
      invoiceData.paymentTerms.discountType === "percentage" &&
      invoiceData.paymentTerms.discountValue > 0
    ) {
      discountAmount =
        subtotal * (invoiceData.paymentTerms.discountValue / 100);
    } else if (
      invoiceData.paymentTerms.discountType === "fixed" &&
      invoiceData.paymentTerms.discountValue > 0
    ) {
      discountAmount = invoiceData.paymentTerms.discountValue;
    }

    const total = subtotal + taxAmount - discountAmount;

    // Get existing invoices
    const storedInvoices = localStorage.getItem("invoices");
    let invoices = storedInvoices ? JSON.parse(storedInvoices) : [];

    // Find and update the invoice
    const updatedInvoices = invoices.map((inv: any) => {
      if (inv.id === params.id) {
        return {
          ...inv,
          clientName: invoiceData.clientDetails.clientName,
          invoiceDate: invoiceData.invoiceDate,
          dueDate: invoiceData.paymentTerms.dueDate,
          total: total,
        };
      }
      return inv;
    });

    // Save to localStorage
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));

    // Navigate back to invoices list
    router.push("/invoices");
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 container mx-auto py-6 px-4 flex items-center justify-center">
          <p>Loading invoice...</p>
        </main>
      </div>
    );
  }

  if (!invoiceData) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 container mx-auto py-6 px-4">
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold mb-4">Invoice Not Found</h2>
            <p className="mb-6">
              The invoice you're looking for doesn't exist or has been deleted.
            </p>
            <Button onClick={() => router.push("/invoices")}>
              Back to Invoices
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Calculate invoice totals for preview
  const subtotal = invoiceData.invoiceItems.reduce(
    (sum, item) => sum + item.total,
    0,
  );
  const taxRate = 10; // 10%
  const taxAmount = subtotal * (taxRate / 100);

  // Calculate discount
  let discountAmount = 0;
  if (
    invoiceData.paymentTerms.discountType === "percentage" &&
    invoiceData.paymentTerms.discountValue > 0
  ) {
    discountAmount = subtotal * (invoiceData.paymentTerms.discountValue / 100);
  } else if (
    invoiceData.paymentTerms.discountType === "fixed" &&
    invoiceData.paymentTerms.discountValue > 0
  ) {
    discountAmount = invoiceData.paymentTerms.discountValue;
  }

  const total = subtotal + taxAmount - discountAmount;

  // Map invoice data to preview format
  const previewData = {
    companyInfo: {
      name: invoiceData.companyInfo.name,
      address: invoiceData.companyInfo.address,
      city: invoiceData.companyInfo.city,
      postalCode: invoiceData.companyInfo.zip,
      country: invoiceData.companyInfo.country,
      email: invoiceData.companyInfo.email,
      phone: invoiceData.companyInfo.phone,
      logo: invoiceData.companyInfo.logo,
    },
    clientDetails: {
      name: invoiceData.clientDetails.clientName,
      address: invoiceData.clientDetails.clientAddress,
      city: invoiceData.clientDetails.clientCity,
      postalCode: invoiceData.clientDetails.clientZip,
      country: invoiceData.clientDetails.clientCountry,
      email: invoiceData.clientDetails.clientEmail,
      phone: invoiceData.clientDetails.clientPhone,
    },
    invoiceItems: invoiceData.invoiceItems,
    paymentTerms: {
      invoiceNumber: invoiceData.invoiceNumber,
      invoiceDate: invoiceData.invoiceDate,
      dueDate: invoiceData.paymentTerms.dueDate,
      notes: invoiceData.paymentTerms.notes,
    },
    discountType: invoiceData.paymentTerms.discountType,
    discountValue: invoiceData.paymentTerms.discountValue,
    discountAmount,
    subtotal,
    taxRate,
    taxAmount,
    total,
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            onClick={() => router.push("/invoices")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Invoices
          </Button>

          <Button
            onClick={handleSaveInvoice}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="w-full">
            <InvoiceForm
              onUpdate={handleInvoiceUpdate}
              initialData={invoiceData}
            />
          </div>
          <div className="w-full h-full bg-muted/20 rounded-lg shadow-sm">
            <InvoicePreview {...previewData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditInvoicePage;
