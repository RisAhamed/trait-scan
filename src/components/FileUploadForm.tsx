
import React, { useState, useRef } from 'react';
import { Upload, File, X, Loader2, FileText, Image, FileIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface FileUploadFormProps {
  onAnalyze?: (data: { files?: File[], text?: string }) => void;
}

const FileUploadForm: React.FC<FileUploadFormProps> = ({ onAnalyze }) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [textInput, setTextInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const acceptedTypes = ['.pdf', '.docx', '.txt'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const validateFile = (file: File): boolean => {
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!acceptedTypes.includes(extension)) {
      toast({
        title: "Invalid file type",
        description: `Please upload ${acceptedTypes.join(', ')} files only.`,
        variant: "destructive",
      });
      return false;
    }
    
    if (file.size > maxFileSize) {
      toast({
        title: "File too large",
        description: "Please upload files smaller than 10MB.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(validateFile);
    
    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const validFiles = selectedFiles.filter(validateFile);
      
      if (validFiles.length > 0) {
        setFiles(prev => [...prev, ...validFiles]);
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'docx':
        return <FileIcon className="h-5 w-5 text-blue-500" />;
      case 'txt':
        return <File className="h-5 w-5 text-gray-500" />;
      default:
        return <FileIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleAnalyze = async () => {
    if (files.length === 0 && !textInput.trim()) {
      toast({
        title: "No content to analyze",
        description: "Please upload files or enter text to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Replace with actual API call to ${API_BASE}/api/upload
      console.log('Analyzing files:', files);
      console.log('Analyzing text:', textInput);
      
      // Mock analysis delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onAnalyze) {
        onAnalyze({ files, text: textInput });
      }
      
      toast({
        title: "Analysis Started",
        description: "Your content is being processed for persona analysis.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to start analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* File Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-2xl transition-all duration-200 ${
          dragActive 
            ? 'border-accent bg-accent/5' 
            : 'border-border hover:border-accent/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label="Upload files for analysis"
        />
        
        <div className="p-8 text-center">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Drop files here or click to upload</h3>
          <p className="text-muted-foreground mb-4">
            Support for PDF, DOCX, and TXT files up to 10MB
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            Choose Files
          </Button>
        </div>
      </div>

      {/* Uploaded Files List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-muted-foreground">Uploaded Files:</h4>
          {files.map((file, index) => (
            <div key={index} className="flex items-center gap-3 p-3 card-surface rounded-lg">
              {getFileIcon(file.name)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                aria-label={`Remove ${file.name}`}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Text Input Alternative */}
      <div className="space-y-3">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">or paste text content</span>
          </div>
        </div>
        
        <Textarea
          placeholder="Paste social media posts, bio information, or any text content you'd like to analyze..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="min-h-32 input-field resize-none"
          aria-label="Text content for analysis"
        />
      </div>

      {/* Analyze Button */}
      <Button
        onClick={handleAnalyze}
        className="w-full btn-primary py-4 text-lg"
        disabled={isLoading || (files.length === 0 && !textInput.trim())}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Analyzing Content...
          </>
        ) : (
          'Analyze Persona'
        )}
      </Button>
    </div>
  );
};

export default FileUploadForm;
