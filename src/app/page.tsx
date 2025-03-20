"use client";

import { useState } from "react";
import Header from "@/components/Header";
import InvoiceForm from "@/components/InvoiceForm";
import InvoicePreview from "@/components/InvoicePreview";
import ActionButtons from "@/components/ActionButtons";

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

export default function Home() {
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
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=company",
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
      discountType: "none",
      discountValue: 0,
    },
    invoiceNumber: `INV-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`,
    invoiceDate: new Date().toISOString().split("T")[0],
  });

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
    discountAmount = subtotal * (invoiceData.paymentTerms.discountValue / 100);
  } else if (
    invoiceData.paymentTerms.discountType === "fixed" &&
    invoiceData.paymentTerms.discountValue > 0
  ) {
    discountAmount = invoiceData.paymentTerms.discountValue;
  } else if (invoiceData.paymentTerms.discountType === "taxi") {
    discountAmount = subtotal * 0.1; // Taxi discount is fixed at 10%
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

  const handleInvoiceUpdate = (data: InvoiceData) => {
    setInvoiceData(data);
  };

  const handleSaveDraft = () => {
    console.log("Saving draft...", invoiceData);

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

    // Get existing invoices from localStorage
    const storedInvoices = localStorage.getItem("invoices");
    let invoices = storedInvoices ? JSON.parse(storedInvoices) : [];

    // Create a new invoice object
    const newInvoice = {
      id: Math.random().toString(36).substr(2, 9),
      invoiceNumber: invoiceData.invoiceNumber,
      clientName: invoiceData.clientDetails.clientName,
      invoiceDate: invoiceData.invoiceDate,
      dueDate: invoiceData.paymentTerms.dueDate,
      total: total,
      status: "draft",
    };

    // Add to invoices array
    invoices.push(newInvoice);

    // Save to localStorage
    localStorage.setItem("invoices", JSON.stringify(invoices));

    // Show confirmation
    alert("Invoice saved as draft!");
  };

  const handlePreview = () => {
    console.log("Previewing invoice...");
    // Open a dialog with a full-screen preview
    window.open(
      `/preview?data=${encodeURIComponent(JSON.stringify(previewData))}`,
      "_blank",
    );
  };

  const handleExportPdf = () => {
    console.log("Exporting to PDF...");
    // Open the preview page with PDF download option
    window.open(
      `/preview?data=${encodeURIComponent(JSON.stringify(previewData))}&download=true`,
      "_blank",
    );
  };

  const handleEmailClient = () => {
    console.log("Preparing to email client...");
    // Implementation would open email dialog
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-6 px-4">
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
      <footer className="sticky bottom-0 z-10">
        <ActionButtons
          onSaveDraft={handleSaveDraft}
          onPreview={handlePreview}
          onExportPdf={handleExportPdf}
          onEmailClient={handleEmailClient}
        />
      </footer>
    </div>
  );
}
