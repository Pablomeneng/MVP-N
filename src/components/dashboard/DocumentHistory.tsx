import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, FileDown, Search, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Document {
  id: string;
  name: string;
  createdAt: string;
  status: "completed" | "pending" | "error";
  type: string;
}

interface DocumentHistoryProps {
  documents?: Document[];
  onDownload?: (id: string, format: "pdf" | "docx") => void;
  onFilter?: (status: string) => void;
  onSearch?: (query: string) => void;
}

const defaultDocuments: Document[] = [
  {
    id: "1",
    name: "Power of Attorney - John Doe",
    createdAt: "2024-03-20",
    status: "completed",
    type: "Legal Document",
  },
  {
    id: "2",
    name: "Affidavit - Property Transfer",
    createdAt: "2024-03-19",
    status: "pending",
    type: "Affidavit",
  },
  {
    id: "3",
    name: "Deed of Trust",
    createdAt: "2024-03-18",
    status: "error",
    type: "Property Document",
  },
];

const DocumentHistory = ({
  documents = defaultDocuments,
  onDownload = () => {},
  onFilter = () => {},
  onSearch = () => {},
}: DocumentHistoryProps) => {
  const statusColors = {
    completed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Document History</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search documents..."
              className="pl-10 w-[250px]"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onFilter("all")}>
                All Documents
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onFilter("completed")}>
                Completed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onFilter("pending")}>
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onFilter("error")}>
                Error
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">{doc.name}</TableCell>
                <TableCell>{doc.type}</TableCell>
                <TableCell>{doc.createdAt}</TableCell>
                <TableCell>
                  <Badge className={statusColors[doc.status]}>
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onDownload(doc.id, "pdf")}
                      >
                        <FileDown className="h-4 w-4 mr-2" />
                        Download PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDownload(doc.id, "docx")}
                      >
                        <FileDown className="h-4 w-4 mr-2" />
                        Download DOCX
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DocumentHistory;
