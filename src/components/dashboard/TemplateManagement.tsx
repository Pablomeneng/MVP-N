import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TemplateUploader from "./TemplateUploader";
import TemplateGrid from "./TemplateGrid";

interface TemplateManagementProps {
  onUpload?: (file: File) => void;
  onViewTemplate?: (id: string) => void;
  onDownloadTemplate?: (id: string) => void;
  onDeleteTemplate?: (id: string) => void;
}

const TemplateManagement = ({
  onUpload = () => {},
  onViewTemplate = () => {},
  onDownloadTemplate = () => {},
  onDeleteTemplate = () => {},
}: TemplateManagementProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = async (file: File) => {
    setIsUploading(true);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    onUpload(file);
    setIsUploading(false);
    setUploadProgress(0);
  };

  return (
    <Card className="w-full max-w-[1200px] min-h-[400px] bg-white p-6">
      <Tabs defaultValue="templates" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="upload">Upload New</TabsTrigger>
          </TabsList>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Template
          </Button>
        </div>

        <TabsContent value="templates" className="mt-0">
          <TemplateGrid
            onView={onViewTemplate}
            onDownload={onDownloadTemplate}
            onDelete={onDeleteTemplate}
          />
        </TabsContent>

        <TabsContent value="upload" className="mt-0">
          <div className="flex justify-center">
            <TemplateUploader
              onUpload={handleUpload}
              isUploading={isUploading}
              progress={uploadProgress}
            />
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default TemplateManagement;
