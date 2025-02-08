import React from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import TemplateManagement from "./dashboard/TemplateManagement";
import DocumentHistory from "./dashboard/DocumentHistory";
import FormGenerator from "./dashboard/FormGenerator";

interface HomeProps {
  userRole?: "admin" | "client";
  userName?: string;
  userAvatar?: string;
}

const Home = ({
  userRole = "admin",
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
}: HomeProps) => {
  const handleLogout = () => {
    // Handle logout logic
    console.log("Logging out...");
  };

  const handleTemplateUpload = (file: File) => {
    console.log("Uploading template:", file.name);
  };

  const handleDocumentDownload = (id: string, format: "pdf" | "docx") => {
    console.log(`Downloading document ${id} in ${format} format`);
  };

  const handleFormSubmit = (data: Record<string, any>) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        userName={userName}
        userRole={userRole}
        userAvatar={userAvatar}
        onLogout={handleLogout}
      />

      <main className="pt-20 px-6 pb-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {userRole === "admin" && (
            <>
              <section>
                <h2 className="text-2xl font-bold mb-4">Template Management</h2>
                <TemplateManagement onUpload={handleTemplateUpload} />
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Document Generation</h2>
                <FormGenerator onSubmit={handleFormSubmit} />
              </section>
            </>
          )}

          <section>
            <h2 className="text-2xl font-bold mb-4">Document History</h2>
            <DocumentHistory onDownload={handleDocumentDownload} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
