
import React, { useState } from 'react';
import { AlertTriangle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const RemovalRequest = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    profileUrl: '',
    reason: '',
    details: '',
    contactEmail: '',
    proof: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Replace with real API call to ${API_BASE}/api/remove-request
      const response = await fetch('/api/mock/remove-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      setTicketId(result.ticket_id);

      toast({
        title: "Removal Request Submitted",
        description: `Your request has been received. Ticket ID: ${result.ticket_id}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit removal request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (ticketId) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="card-surface text-center">
          <CardContent className="pt-8 space-y-6">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
              <Send className="h-8 w-8 text-success" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Request Submitted</h2>
              <p className="text-muted-foreground mb-4">
                Your removal request has been received and will be processed within 30 days.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-medium">Ticket ID: {ticketId}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Save this ID for your records
                </p>
              </div>
            </div>
            <Button onClick={() => window.close()}>
              Close
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 border border-warning/20">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="text-sm font-medium text-warning">Data Removal Request</span>
          </div>
          <h1 className="text-4xl font-bold">Request Data Removal</h1>
          <p className="text-xl text-muted-foreground">
            Request removal of your profile data from our analysis system.
          </p>
        </div>

        {/* Form */}
        <Card className="card-surface">
          <CardHeader>
            <CardTitle>Removal Request Form</CardTitle>
            <CardDescription>
              Please provide the following information to process your removal request.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Profile URL <span className="text-danger">*</span>
                </label>
                <Input
                  type="url"
                  placeholder="https://twitter.com/username or @username"
                  value={formData.profileUrl}
                  onChange={(e) => handleInputChange('profileUrl', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Reason for Removal <span className="text-danger">*</span>
                </label>
                <Select
                  value={formData.reason}
                  onValueChange={(value) => handleInputChange('reason', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="privacy_concerns">Privacy Concerns</SelectItem>
                    <SelectItem value="inaccurate_data">Inaccurate Data</SelectItem>
                    <SelectItem value="account_deleted">Account Deleted</SelectItem>
                    <SelectItem value="unauthorized_analysis">Unauthorized Analysis</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Additional Details</label>
                <Textarea
                  placeholder="Please provide any additional context..."
                  value={formData.details}
                  onChange={(e) => handleInputChange('details', e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Contact Email <span className="text-danger">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Proof of Identity (Optional)</label>
                <Input
                  type="text"
                  placeholder="Link to verification post or other proof"
                  value={formData.proof}
                  onChange={(e) => handleInputChange('proof', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Provide a link to a verification post or other proof that you own the profile.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Removal Request'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Legal Notice */}
        <Card className="card-surface border-muted">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              <strong>Processing Time:</strong> Removal requests are typically processed within 30 business days. 
              You will receive an email confirmation once your data has been removed from our systems.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RemovalRequest;
