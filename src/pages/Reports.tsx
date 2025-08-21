// src/pages/Reports.tsx
import React from 'react';
import { FileText } from 'lucide-react';

const Reports = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
      <FileText className="h-16 w-16 text-accent mx-auto mb-4" />
      <h1 className="text-4xl font-bold">Reports</h1>
      <p className="text-xl text-muted-foreground mt-2">
        This page is under construction. Your generated reports will be available here.
      </p>
    </div>
  );
};

export default Reports;