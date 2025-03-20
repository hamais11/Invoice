import { useRef } from "react";
import { usePDF } from "react-to-pdf";

export const useToPDF = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { toPDF, targetRef: pdfTargetRef } = usePDF({
    filename: "invoice.pdf",
    page: { margin: 20 },
    method: "open", // This forces the PDF to download immediately
    resolution: 2, // Higher resolution for better quality
    page: {
      margin: 20,
      format: "A4",
      orientation: "portrait",
    },
  });

  return { toPDF, targetRef: targetRef };
};
