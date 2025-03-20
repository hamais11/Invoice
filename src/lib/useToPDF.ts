import { useRef } from "react";
import { usePDF } from "react-to-pdf";

export const useToPDF = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { toPDF, targetRef: pdfTargetRef } = usePDF({
    filename: "invoice.pdf",
    page: { margin: 20 },
  });

  return { toPDF, targetRef: targetRef };
};
