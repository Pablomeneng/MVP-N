import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Eye, Download, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface TemplateCardProps {
  id: string;
  title: string;
  description: string;
  placeholders: string[];
  lastModified: string;
  status: "active" | "draft" | "archived";
}

interface TemplateGridProps {
  templates: TemplateCardProps[];
  onView?: (id: string) => void;
  onDownload?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const defaultTemplates: TemplateCardProps[] = [
  {
    id: "1",
    title: "Power of Attorney",
    description: "Standard power of attorney document template",
    placeholders: ["[CLIENT_NAME]", "[ATTORNEY_NAME]", "[DATE]", "[ADDRESS]"],
    lastModified: "2024-03-20",
    status: "active",
  },
  {
    id: "2",
    title: "Affidavit Template",
    description: "General purpose affidavit template",
    placeholders: ["[DECLARANT_NAME]", "[STATE]", "[STATEMENT]"],
    lastModified: "2024-03-19",
    status: "draft",
  },
  {
    id: "3",
    title: "Deed Transfer",
    description: "Property deed transfer document",
    placeholders: ["[GRANTOR]", "[GRANTEE]", "[PROPERTY_DESCRIPTION]"],
    lastModified: "2024-03-18",
    status: "active",
  },
];

const TemplateCard = ({
  template,
  onView,
  onDownload,
  onDelete,
}: {
  template: TemplateCardProps;
  onView?: (id: string) => void;
  onDownload?: (id: string) => void;
  onDelete?: (id: string) => void;
}) => {
  const statusColors = {
    active: "bg-green-100 text-green-800",
    draft: "bg-yellow-100 text-yellow-800",
    archived: "bg-gray-100 text-gray-800",
  };

  return (
    <Card className="w-full max-w-sm bg-white">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">
            {template.title}
          </CardTitle>
          <Badge className={statusColors[template.status]}>
            {template.status.charAt(0).toUpperCase() + template.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{template.description}</p>
        <div className="space-y-2">
          <p className="text-sm font-medium">Placeholders:</p>
          <div className="flex flex-wrap gap-2">
            {template.placeholders.map((placeholder, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {placeholder}
              </Badge>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Last modified: {template.lastModified}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onView?.(template.id)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>View template</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDownload?.(template.id)}
              >
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Download template</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete?.(template.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete template</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

const TemplateGrid = ({
  templates = defaultTemplates,
  onView = () => {},
  onDownload = () => {},
  onDelete = () => {},
}: TemplateGridProps) => {
  return (
    <div className="w-full bg-gray-50 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onView={onView}
            onDownload={onDownload}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateGrid;
