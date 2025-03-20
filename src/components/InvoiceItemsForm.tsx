"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

interface InvoiceItemsFormProps {
  items?: InvoiceItem[];
  onItemsChange?: (items: InvoiceItem[]) => void;
}

export default function InvoiceItemsForm({
  items: initialItems = [
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
  onItemsChange = () => {},
}: InvoiceItemsFormProps) {
  const [items, setItems] = useState<InvoiceItem[]>(initialItems);

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      price: 0,
      total: 0,
    };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    onItemsChange(updatedItems);
  };

  const removeItem = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    onItemsChange(updatedItems);
  };

  const updateItem = (
    id: string,
    field: keyof InvoiceItem,
    value: string | number,
  ) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };

        // Recalculate total if quantity or price changes
        if (field === "quantity" || field === "price") {
          const quantity = field === "quantity" ? Number(value) : item.quantity;
          const price = field === "price" ? Number(value) : item.price;
          updatedItem.total = quantity * price;
        }

        return updatedItem;
      }
      return item;
    });

    setItems(updatedItems);
    onItemsChange(updatedItems);
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  return (
    <Card className="w-full bg-background">
      <CardHeader>
        <CardTitle>Invoice Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-4 font-medium text-sm">
            <div className="col-span-5">Description</div>
            <div className="col-span-2">Quantity</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Total</div>
            <div className="col-span-1"></div>
          </div>

          {items.map((item) => (
            <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-5">
                <Input
                  value={item.description}
                  onChange={(e) =>
                    updateItem(item.id, "description", e.target.value)
                  }
                  placeholder="Item description"
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(item.id, "quantity", Number(e.target.value))
                  }
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.price}
                  onChange={(e) =>
                    updateItem(item.id, "price", Number(e.target.value))
                  }
                />
              </div>
              <div className="col-span-2 font-medium">
                ${item.total.toFixed(2)}
              </div>
              <div className="col-span-1 text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={addItem}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Item
          </Button>

          <div className="flex justify-end mt-6 pt-4 border-t">
            <div className="w-1/3 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">
                  ${calculateSubtotal().toFixed(2)}
                </span>
              </div>
              {/* Additional calculations like tax could be added here */}
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total:</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
