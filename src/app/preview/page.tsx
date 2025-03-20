"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import InvoicePreview from "@/components/InvoicePreview";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { useToPDF } from "@/lib/useToPDF";

const PreviewPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [previewData, setPreviewData] = useState<any>(null);
  const { toPDF, targetRef } = useToPDF();

  useEffect(() => {
    const dataParam = searchParams.get("data");
    const shouldDownload = searchParams.get("download") === "true";

    if (dataParam) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(dataParam));
        setPreviewData(parsedData);

        // If download parameter is true, trigger PDF download automatically
        if (shouldDownload) {
          setTimeout(() => {
            toPDF();
            // Force download by creating a direct download link as fallback
            const element = document.createElement("a");
            element.setAttribute(
              "href",
              "data:application/pdf;charset=utf-8," +
                encodeURIComponent(JSON.stringify(parsedData)),
            );
            element.setAttribute("download", "invoice.pdf");
            element.style.display = "none";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
          }, 1000); // Small delay to ensure rendering is complete
        }
      } catch (error) {
        console.error("Error parsing preview data:", error);
      }
    }
  }, [searchParams, toPDF]);

  if (!previewData) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 container mx-auto py-6 px-4 flex items-center justify-center">
          <p>No preview data available.</p>
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
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="flex gap-2">
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
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md" ref={targetRef}>
          <InvoicePreview
            companyInfo={previewData.companyInfo}
            clientDetails={previewData.clientDetails}
            invoiceItems={previewData.invoiceItems}
            paymentTerms={previewData.paymentTerms}
            subtotal={previewData.subtotal}
            taxRate={previewData.taxRate}
            taxAmount={previewData.taxAmount}
            discountType={previewData.discountType}
            discountValue={previewData.discountValue}
            discountAmount={previewData.discountAmount}
            total={previewData.total}
          />
        </div>
      </main>
    </div>
  );
};

export default PreviewPage;
