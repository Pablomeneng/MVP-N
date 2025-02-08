import React, { useCallback, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, File, X } from "lucide-react";

interface TemplateUploaderProps {
  onUpload?: (file: File) => void;
  isUploading?: boolean;
  progress?: number;
}

const TemplateUploader = ({
  onUpload = () => {},
  isUploading = false,
  progress = 0,
}: TemplateUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const files = e.dataTransfer.files;
      if (files?.[0]) {
        setSelectedFile(files[0]);
        onUpload(files[0]);
      }
    },
    [onUpload],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const files = e.target.files;
      if (files?.[0]) {
        setSelectedFile(files[0]);
        onUpload(files[0]);
      }
    },
    [onUpload],
  );

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
  }, []);

  return (
    <Card className="w-full max-w-[600px] h-[200px] bg-white p-6">
      <div
        className={`relative h-full rounded-lg border-2 border-dashed transition-colors ${
          dragActive ? "border-primary bg-primary/10" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".docx"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
          {!selectedFile && !isUploading && (
            <>
              <Upload className="h-10 w-10 text-gray-400 mb-4" />
              <p className="text-sm font-medium">
                Drag and drop your template here
              </p>
              <p className="text-xs text-gray-500 mt-1">or click to browse</p>
              <p className="text-xs text-gray-400 mt-2">Supports .docx files</p>
            </>
          )}

          {selectedFile && !isUploading && (
            <div className="flex items-center gap-4">
              <File className="h-8 w-8 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium truncate">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemoveFile}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {isUploading && (
            <div className="w-full space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Uploading...</span>
                <span className="text-sm text-gray-500">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TemplateUploader;
