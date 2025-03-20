import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface ClientDetailsFormProps {
  clientName?: string;
  clientEmail?: string;
  clientAddress?: string;
  clientCity?: string;
  clientState?: string;
  clientZip?: string;
  clientCountry?: string;
  clientPhone?: string;
  onChange?: (field: string, value: string) => void;
}

const ClientDetailsForm = ({
  clientName = "",
  clientEmail = "",
  clientAddress = "",
  clientCity = "",
  clientState = "",
  clientZip = "",
  clientCountry = "",
  clientPhone = "",
  onChange = () => {},
}: ClientDetailsFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <Card className="w-full bg-background">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Client Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="clientName">Client Name</Label>
            <Input
              id="clientName"
              name="clientName"
              value={clientName}
              onChange={handleChange}
              placeholder="Client or Company Name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientEmail">Email</Label>
            <Input
              id="clientEmail"
              name="clientEmail"
              type="email"
              value={clientEmail}
              onChange={handleChange}
              placeholder="client@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientPhone">Phone</Label>
            <Input
              id="clientPhone"
              name="clientPhone"
              value={clientPhone}
              onChange={handleChange}
              placeholder="(123) 456-7890"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientAddress">Address</Label>
            <Input
              id="clientAddress"
              name="clientAddress"
              value={clientAddress}
              onChange={handleChange}
              placeholder="Street Address"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientCity">City</Label>
            <Input
              id="clientCity"
              name="clientCity"
              value={clientCity}
              onChange={handleChange}
              placeholder="City"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientState">State/Province</Label>
            <Input
              id="clientState"
              name="clientState"
              value={clientState}
              onChange={handleChange}
              placeholder="State/Province"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientZip">Postal Code</Label>
            <Input
              id="clientZip"
              name="clientZip"
              value={clientZip}
              onChange={handleChange}
              placeholder="Postal/Zip Code"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientCountry">Country</Label>
            <Input
              id="clientCountry"
              name="clientCountry"
              value={clientCountry}
              onChange={handleChange}
              placeholder="Country"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientDetailsForm;
