"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import InvoicePreview from "@/components/InvoicePreview";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Printer, Mail, Edit } from "lucide-react";
import { useToPDF } from "@/lib/useToPDF";

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

interface InvoiceData {
  id: string;
  companyInfo: CompanyInfo;
  clientDetails: ClientDetails;
  invoiceItems: InvoiceItem[];
  paymentTerms: PaymentTerms;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountType: string;
  discountValue: number;
  discountAmount: number;
  total: number;
  status: "draft" | "sent" | "paid" | "overdue";
}

const InvoiceDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toPDF, targetRef } = useToPDF();

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
          id: foundInvoice.id,
          companyInfo: {
            name: "Your Company Name",
            address: "123 Business Street",
            city: "City",
            postalCode: "12345",
            country: "Country",
            email: "contact@yourcompany.com",
            phone: "(555) 123-4567",
            logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=company",
          },
          clientDetails: {
            name: foundInvoice.clientName,
            address: "456 Client Avenue",
            city: "Client City",
            postalCode: "54321",
            country: "Client Country",
            email: "client@example.com",
            phone: "(555) 987-6543",
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
            invoiceNumber: foundInvoice.invoiceNumber,
            invoiceDate: foundInvoice.invoiceDate,
            dueDate: foundInvoice.dueDate,
            notes: "Please make payment by the due date.",
          },
          subtotal: foundInvoice.total * 0.9, // Approximating subtotal
          taxRate: 10,
          taxAmount: foundInvoice.total * 0.1, // Approximating tax
          discountType: "none",
          discountValue: 0,
          discountAmount: 0,
          total: foundInvoice.total,
          status: foundInvoice.status,
        };

        setInvoice(mockInvoiceData);
      }
    }
    setLoading(false);
  }, [params.id]);

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

  if (!invoice) {
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

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.push(`/invoices/edit/${invoice.id}`)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="outline"
              onClick={() => window.print()}
              className="flex items-center gap-2"
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button
              variant="secondary"
              onClick={toPDF}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email to Client
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md" ref={targetRef}>
          <InvoicePreview
            companyInfo={invoice.companyInfo}
            clientDetails={invoice.clientDetails}
            invoiceItems={invoice.invoiceItems}
            paymentTerms={invoice.paymentTerms}
            subtotal={invoice.subtotal}
            taxRate={invoice.taxRate}
            taxAmount={invoice.taxAmount}
            discountType={invoice.discountType}
            discountValue={invoice.discountValue}
            discountAmount={invoice.discountAmount}
            total={invoice.total}
          />
        </div>
      </main>
    </div>
  );
};

export default InvoiceDetailPage;
