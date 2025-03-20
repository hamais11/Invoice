"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Pencil, Trash2, Plus, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  invoiceDate: string;
  dueDate: string;
  total: number;
  status: "draft" | "sent" | "paid" | "overdue";
}

const InvoicesPage = () => {
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

  // Load invoices from localStorage on component mount
  useEffect(() => {
    const storedInvoices = localStorage.getItem("invoices");
    if (storedInvoices) {
      setInvoices(JSON.parse(storedInvoices));
    } else {
      // Sample data if no invoices exist
      const sampleInvoices: Invoice[] = [
        {
          id: "1",
          invoiceNumber: "INV-2023-001",
          clientName: "Acme Corporation",
          invoiceDate: "2023-06-01",
          dueDate: "2023-07-01",
          total: 1250.0,
          status: "paid",
        },
        {
          id: "2",
          invoiceNumber: "INV-2023-002",
          clientName: "Globex Inc.",
          invoiceDate: "2023-06-15",
          dueDate: "2023-07-15",
          total: 3450.75,
          status: "sent",
        },
        {
          id: "3",
          invoiceNumber: "INV-2023-003",
          clientName: "Stark Industries",
          invoiceDate: "2023-06-30",
          dueDate: "2023-07-30",
          total: 7800.5,
          status: "draft",
        },
      ];
      setInvoices(sampleInvoices);
      localStorage.setItem("invoices", JSON.stringify(sampleInvoices));
    }
  }, []);

  const handleDeleteInvoice = (id: string) => {
    setSelectedInvoice(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedInvoice) {
      const updatedInvoices = invoices.filter(
        (invoice) => invoice.id !== selectedInvoice,
      );
      setInvoices(updatedInvoices);
      localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
      setDeleteDialogOpen(false);
      setSelectedInvoice(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "sent":
        return "bg-blue-100 text-blue-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Invoices</h1>
          <Button
            onClick={() => router.push("/")}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create New Invoice
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">All Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Invoice #</th>
                    <th className="text-left py-3 px-4">Client</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Due Date</th>
                    <th className="text-right py-3 px-4">Amount</th>
                    <th className="text-center py-3 px-4">Status</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">{invoice.invoiceNumber}</td>
                      <td className="py-3 px-4">{invoice.clientName}</td>
                      <td className="py-3 px-4">{invoice.invoiceDate}</td>
                      <td className="py-3 px-4">{invoice.dueDate}</td>
                      <td className="py-3 px-4 text-right">
                        ${invoice.total.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            invoice.status,
                          )}`}
                        >
                          {invoice.status.charAt(0).toUpperCase() +
                            invoice.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              router.push(`/invoices/${invoice.id}`)
                            }
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              router.push(`/invoices/edit/${invoice.id}`)
                            }
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteInvoice(invoice.id)}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              console.log(`Download invoice ${invoice.id}`)
                            }
                            title="Download PDF"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Are you sure you want to delete this invoice? This action cannot be
            undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoicesPage;
