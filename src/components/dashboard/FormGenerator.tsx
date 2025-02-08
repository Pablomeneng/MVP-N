import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FormField {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "date" | "boolean";
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

interface FormGeneratorProps {
  fields?: FormField[];
  onSubmit?: (data: Record<string, any>) => void;
  isLoading?: boolean;
}

const defaultFields: FormField[] = [
  {
    id: "clientName",
    label: "Client Name",
    type: "text",
    placeholder: "Enter client name",
    required: true,
  },
  {
    id: "documentType",
    label: "Document Type",
    type: "select",
    options: ["Power of Attorney", "Affidavit", "Deed Transfer"],
    required: true,
  },
  {
    id: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter document description",
  },
  {
    id: "date",
    label: "Document Date",
    type: "date",
    required: true,
  },
  {
    id: "isUrgent",
    label: "Urgent Processing",
    type: "boolean",
  },
];

const FormGenerator = ({
  fields = defaultFields,
  onSubmit = () => {},
  isLoading = false,
}: FormGeneratorProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (id: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case "text":
        return (
          <Input
            id={field.id}
            placeholder={field.placeholder}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            required={field.required}
          />
        );

      case "textarea":
        return (
          <Textarea
            id={field.id}
            placeholder={field.placeholder}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            required={field.required}
          />
        );

      case "select":
        return (
          <Select
            value={formData[field.id] || ""}
            onValueChange={(value) => handleChange(field.id, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "date":
        return (
          <Input
            type="date"
            id={field.id}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            required={field.required}
          />
        );

      case "boolean":
        return (
          <Switch
            checked={formData[field.id] || false}
            onCheckedChange={(checked) => handleChange(field.id, checked)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-[800px] bg-white">
      <CardHeader>
        <h2 className="text-2xl font-bold">Document Form Generator</h2>
        <p className="text-gray-500">Fill in the required information</p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>
                {renderField(field)}
              </div>
            ))}
            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate Document"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default FormGenerator;
