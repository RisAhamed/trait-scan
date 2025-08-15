
import React, { useState, useEffect } from 'react';
import { Shield, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface PrivacySettings {
  allowDeeperScans: boolean;
  agreeToPublicDataAnalysis: boolean;
  dataRetentionDays: string;
}

const Privacy = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<PrivacySettings>({
    allowDeeperScans: false,
    agreeToPublicDataAnalysis: false,
    dataRetentionDays: '90'
  });

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('privacy_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('privacy_settings', JSON.stringify(settings));
    toast({
      title: "Privacy Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleSettingChange = (key: keyof PrivacySettings, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
            <Shield className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Privacy & Data Control</span>
          </div>
          <h1 className="text-4xl font-bold">Privacy Settings</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Control how we analyze data and manage your privacy preferences.
          </p>
        </div>

        {/* Settings Cards */}
        <div className="space-y-6">
          <Card className="card-surface">
            <CardHeader>
              <CardTitle>Data Analysis Permissions</CardTitle>
              <CardDescription>
                Configure what types of analysis we can perform on your behalf.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Allow deeper scans (connect account)</p>
                  <p className="text-sm text-muted-foreground">
                    Connect your social accounts for more detailed analysis
                  </p>
                </div>
                <Switch
                  checked={settings.allowDeeperScans}
                  onCheckedChange={(checked) => handleSettingChange('allowDeeperScans', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">
                    Agree to public-data analysis 
                    <span className="text-danger text-sm ml-2">*Required</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Allow analysis of publicly available social media data
                  </p>
                </div>
                <Switch
                  checked={settings.agreeToPublicDataAnalysis}
                  onCheckedChange={(checked) => handleSettingChange('agreeToPublicDataAnalysis', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="card-surface">
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
              <CardDescription>
                Choose how long we keep your analysis data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <label className="text-sm font-medium">Data retention period</label>
                <Select
                  value={settings.dataRetentionDays}
                  onValueChange={(value) => handleSettingChange('dataRetentionDays', value)}
                >
                  <SelectTrigger className="max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  After this period, your persona analysis data will be automatically deleted.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-surface">
            <CardHeader>
              <CardTitle>Data Rights</CardTitle>
              <CardDescription>
                Request removal of your data or get a copy of your information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" onClick={() => window.open('/support/remove', '_blank')}>
                  Request Data Removal
                </Button>
                <Button variant="outline">
                  Download My Data
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Data removal requests are typically processed within 30 days.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <Button onClick={handleSave} className="btn-primary px-8">
            <Save className="mr-2 h-4 w-4" />
            Save Privacy Settings
          </Button>
        </div>

        {/* Notice */}
        {!settings.agreeToPublicDataAnalysis && (
          <Card className="card-surface border-warning/20 bg-warning/5">
            <CardContent className="pt-6">
              <p className="text-sm text-center text-muted-foreground">
                <strong>Note:</strong> You must agree to public-data analysis to run persona scans and access demo features.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Privacy;
