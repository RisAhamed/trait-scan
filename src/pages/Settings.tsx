
import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { usePlan } from '@/lib/plan';

interface SettingsData {
  allowDeeperScans: boolean;
  agreeToPublicDataAnalysis: boolean;
  dataRetentionDays: string;
  emailNotifications: boolean;
  marketingEmails: boolean;
}

const Settings = () => {
  const { toast } = useToast();
  const { isPro } = usePlan();
  const [settings, setSettings] = useState<SettingsData>({
    allowDeeperScans: false,
    agreeToPublicDataAnalysis: false,
    dataRetentionDays: '90',
    emailNotifications: true,
    marketingEmails: false
  });

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('app_settings');
    if (savedSettings) {
      setSettings({ ...settings, ...JSON.parse(savedSettings) });
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('app_settings', JSON.stringify(settings));
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleSettingChange = (key: keyof SettingsData, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 rounded-2xl flex items-center justify-center">
              <SettingsIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Settings</h1>
              <p className="text-xl text-muted-foreground">
                Manage your account preferences and privacy settings
              </p>
            </div>
          </div>
        </div>

        {/* Settings Cards */}
        <div className="space-y-6">
          {/* Privacy Settings */}
          <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/40 border border-white/20 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                <CardTitle>Privacy & Data</CardTitle>
              </div>
              <CardDescription>
                Configure how we analyze data and manage your privacy preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Allow deeper scans</p>
                  <p className="text-sm text-muted-foreground">
                    {isPro ? 'Connect your social accounts for detailed analysis' : 'Requires Pro plan'}
                  </p>
                </div>
                <Switch
                  checked={settings.allowDeeperScans && isPro}
                  onCheckedChange={(checked) => handleSettingChange('allowDeeperScans', checked)}
                  disabled={!isPro}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">
                    Agree to public-data analysis 
                    <span className="text-red-500 text-sm ml-2">*Required</span>
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

          {/* Notification Settings */}
          <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/40 border border-white/20 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)]">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Choose what notifications you'd like to receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Email notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about your persona analysis
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Marketing emails</p>
                  <p className="text-sm text-muted-foreground">
                    Receive tips, feature updates, and special offers
                  </p>
                </div>
                <Switch
                  checked={settings.marketingEmails}
                  onCheckedChange={(checked) => handleSettingChange('marketingEmails', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Data Rights */}
          <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/40 border border-white/20 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)]">
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
          <Button onClick={handleSave} className="px-8 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 hover:from-indigo-600 hover:via-violet-600 hover:to-cyan-600 text-white border-0">
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>

        {/* Notice */}
        {!settings.agreeToPublicDataAnalysis && (
          <Card className="backdrop-blur-xl bg-yellow-50/60 dark:bg-yellow-950/40 border border-yellow-200/50 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)]">
            <CardContent className="pt-6">
              <p className="text-sm text-center">
                <strong>Note:</strong> You must agree to public-data analysis to run persona scans and access demo features.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Settings;
