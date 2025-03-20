import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Upload, X } from "lucide-react";

interface CompanyInfoFormProps {
  onUpdate?: (companyInfo: CompanyInfo) => void;
  initialData?: CompanyInfo;
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

const CompanyInfoForm = ({
  onUpdate,
  initialData = {
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
}: CompanyInfoFormProps) => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(initialData);
  const [logoPreview, setLogoPreview] = useState<string>(
    initialData.logo || "",
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedInfo = { ...companyInfo, [name]: value };
    setCompanyInfo(updatedInfo);
    onUpdate?.(updatedInfo);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this to a server
      // For now, we'll just create a local URL for preview
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);

      const updatedInfo = { ...companyInfo, logo: previewUrl };
      setCompanyInfo(updatedInfo);
      onUpdate?.(updatedInfo);
    }
  };

  const removeLogo = () => {
    setLogoPreview("");
    const updatedInfo = { ...companyInfo, logo: "" };
    setCompanyInfo(updatedInfo);
    onUpdate?.(updatedInfo);
  };

  return (
    <div className="p-4 rounded-lg border border-border bg-card text-card-foreground shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Company Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-4">
            {logoPreview ? (
              <div className="relative w-16 h-16 rounded-md overflow-hidden border border-border">
                <img
                  src={logoPreview}
                  alt="Company logo"
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={removeLogo}
                  className="absolute top-0 right-0 bg-background/80 p-1 rounded-bl-md"
                  type="button"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : null}

            <div>
              <Label htmlFor="logo-upload" className="block mb-1">
                Company Logo
              </Label>
              <div className="flex items-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mr-2"
                  onClick={() =>
                    document.getElementById("logo-upload")?.click()
                  }
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Logo
                </Button>
                <Input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
                <span className="text-xs text-muted-foreground">
                  Recommended: 200x200px PNG or JPG
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="name" className="block mb-1">
            Company Name
          </Label>
          <Input
            id="name"
            name="name"
            value={companyInfo.name}
            onChange={handleInputChange}
            placeholder="Your Company Name"
          />
        </div>

        <div>
          <Label htmlFor="email" className="block mb-1">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={companyInfo.email}
            onChange={handleInputChange}
            placeholder="contact@yourcompany.com"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="block mb-1">
            Phone
          </Label>
          <Input
            id="phone"
            name="phone"
            value={companyInfo.phone}
            onChange={handleInputChange}
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <Label htmlFor="website" className="block mb-1">
            Website
          </Label>
          <Input
            id="website"
            name="website"
            value={companyInfo.website}
            onChange={handleInputChange}
            placeholder="www.yourcompany.com"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <Label htmlFor="address" className="block mb-1">
            Address
          </Label>
          <Input
            id="address"
            name="address"
            value={companyInfo.address}
            onChange={handleInputChange}
            placeholder="123 Business Street"
          />
        </div>

        <div>
          <Label htmlFor="city" className="block mb-1">
            City
          </Label>
          <Input
            id="city"
            name="city"
            value={companyInfo.city}
            onChange={handleInputChange}
            placeholder="City"
          />
        </div>

        <div>
          <Label htmlFor="state" className="block mb-1">
            State/Province
          </Label>
          <Input
            id="state"
            name="state"
            value={companyInfo.state}
            onChange={handleInputChange}
            placeholder="State"
          />
        </div>

        <div>
          <Label htmlFor="zip" className="block mb-1">
            Zip/Postal Code
          </Label>
          <Input
            id="zip"
            name="zip"
            value={companyInfo.zip}
            onChange={handleInputChange}
            placeholder="12345"
          />
        </div>

        <div>
          <Label htmlFor="country" className="block mb-1">
            Country
          </Label>
          <Input
            id="country"
            name="country"
            value={companyInfo.country}
            onChange={handleInputChange}
            placeholder="Country"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoForm;
