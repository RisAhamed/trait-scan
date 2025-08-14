
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import InputHandle from '@/components/InputHandle';
import FileUploadForm from '@/components/FileUploadForm';
import { useNavigate } from 'react-router-dom';
import { Upload, Link, FileText, Sparkles } from 'lucide-react';

const UploadPage = () => {
  const navigate = useNavigate();

  const handleInputSubmit = (seedId: string) => {
    navigate(`/seed/${seedId}`);
  };

  const handleFileAnalyze = (data: { files?: File[], text?: string }) => {
    // Mock seed creation for file/text analysis
    const mockSeedId = `s_file_${Date.now()}`;
    console.log('File analysis data:', data);
    navigate(`/seed/${mockSeedId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium text-accent">AI-Powered Analysis</span>
        </div>

        <h1 className="text-4xl font-bold mb-4">Upload & Analyze</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover personality traits and behavioral patterns from social media profiles or uploaded content.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            Profile Analysis
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            File Upload
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="card-surface">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Link className="h-5 w-5 text-accent" />
                Social Media Profile Analysis
              </CardTitle>
              <CardDescription>
                Analyze personality traits from social media profiles and usernames
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <InputHandle onSubmit={handleInputSubmit} />
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="card-surface text-center p-6">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Enter Profile</h3>
              <p className="text-sm text-muted-foreground">
                Input a username or profile URL from any major social platform
              </p>
            </Card>

            <Card className="card-surface text-center p-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-secondary font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">AI Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes posts, interactions, and behavioral patterns
              </p>
            </Card>

            <Card className="card-surface text-center p-6">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-success font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Get Insights</h3>
              <p className="text-sm text-muted-foreground">
                Receive detailed personality profile and behavioral insights
              </p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <Card className="card-surface">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <FileText className="h-5 w-5 text-accent" />
                Content Upload Analysis
              </CardTitle>
              <CardDescription>
                Upload documents or paste text content for personality analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <FileUploadForm onAnalyze={handleFileAnalyze} />
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card className="card-surface p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent" />
                Supported Formats
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• PDF documents (resumes, reports)</li>
                <li>• Word documents (.docx)</li>
                <li>• Plain text files (.txt)</li>
                <li>• Direct text paste</li>
              </ul>
            </Card>

            <Card className="card-surface p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-secondary" />
                Best Results
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Social media posts compilation</li>
                <li>• Blog articles or personal writing</li>
                <li>• Professional communication samples</li>
                <li>• Multiple content sources</li>
              </ul>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UploadPage;
