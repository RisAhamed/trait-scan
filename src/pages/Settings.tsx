
import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Shield, Save, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet-async';

interface SettingsData {
  // Privacy settings
  allowDeeperScans: boolean;
  agreeToPublicDataAnalysis: boolean;
  dataRetentionDays: string;
  
  // General settings
  emailNotifications: boolean;
  weeklyReports: boolean;
  displayName: string;
  timezone: string;
}

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SettingsData>({
    allowDeeperScans: false,
    agreeToPublicDataAnalysis: false,
    dataRetentionDays: '90',
    emailNotifications: true,
    weeklyReports: false,
    displayName: '',
    timezone: 'UTC'
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
    <>
      <Helmet>
        <title>Settings - AI Social Persona Finder</title>
        <meta name="description" content="Manage your account settings, privacy preferences, and notification options." />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <SettingsIcon className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Account Settings</span>
            </div>
            <h1 className="text-4xl font-bold">Settings</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Manage your account preferences, privacy settings, and notifications.
            </p>
          </div>

          {/* Settings Cards */}
          <div className="space-y-6">
            {/* General Settings */}
            <Card className="backdrop-blur-xl bg-background/60 border border-border/20 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-accent" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  Configure your basic account preferences and display options.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={settings.displayName}
                      onChange={(e) => handleSettingChange('displayName', e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={settings.timezone}
                      onValueChange={(value) => handleSettingChange('timezone', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="EST">Eastern Time</SelectItem>
                        <SelectItem value="PST">Pacific Time</SelectItem>
                        <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="backdrop-blur-xl bg-background/60 border border-border/20 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-secondary" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Control how and when you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about your analysis results
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Weekly Reports</p>
                    <p className="text-sm text-muted-foreground">
                      Get weekly summaries of your usage and insights
                    </p>
                  </div>
                  <Switch
                    checked={settings.weeklyReports}
                    onCheckedChange={(checked) => handleSettingChange('weeklyReports', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="backdrop-blur-xl bg-background/60 border border-border/20 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Privacy & Data
                </CardTitle>
                <CardDescription>
                  Configure how we analyze data and manage your privacy preferences.
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
                  <Label className="text-sm font-medium">Data retention period</Label>
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

            {/* Data Rights */}
            <Card className="backdrop-blur-xl bg-background/60 border border-border/20 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)]">
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
            <Button onClick={handleSave} className="bg-gradient-to-r from-accent via-secondary to-primary text-white hover:opacity-90 px-8">
              <Save className="mr-2 h-4 w-4" />
              Save All Settings
            </Button>
          </div>

          {/* Notice */}
          {!settings.agreeToPublicDataAnalysis && (
            <Card className="backdrop-blur-xl bg-warning/5 border border-warning/20 rounded-2xl">
              <CardContent className="pt-6">
                <p className="text-sm text-center text-muted-foreground">
                  <strong>Note:</strong> You must agree to public-data analysis to run persona scans and access demo features.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default Settings;
