import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlertIcon, InfoIcon, DatabaseIcon, UsersIcon } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold text-primary">Privacy Policy</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Your privacy is important to us at MediQuery.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <InfoIcon className="h-6 w-6 mr-2 text-accent" />
            Introduction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground">
            This Privacy Policy explains how MediQuery ("we," "us," or "our") collects, uses, and discloses information about you when you use our application. This is a demo application, and data handling practices reflect this context.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DatabaseIcon className="h-6 w-6 mr-2 text-accent" />
            Information We Collect
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-foreground">
            <strong>Symptom Information:</strong> When you use the chatbot, we collect the symptom descriptions you provide. This information is sent to our AI model to generate medicine suggestions.
          </p>
          <p className="text-foreground">
            <strong>Usage Data:</strong> We may collect anonymous usage data to improve the application, such as interaction patterns. This data is not personally identifiable.
          </p>
          <p className="text-foreground">
            <strong>No Personal Accounts:</strong> This version of MediQuery does not require user accounts, so we do not collect personal identification information like names, email addresses, or phone numbers for account creation.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UsersIcon className="h-6 w-6 mr-2 text-accent" />
            How We Use Your Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-foreground">
            <strong>To Provide Services:</strong> Symptom information is used solely to power the AI analysis and provide medicine suggestions.
          </p>
          <p className="text-foreground">
            <strong>To Improve Our App:</strong> Anonymized usage data helps us understand how MediQuery is used and identify areas for improvement.
          </p>
          <p className="text-foreground">
            <strong>No Marketing:</strong> We do not use your information for marketing or advertising purposes.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShieldAlertIcon className="h-6 w-6 mr-2 text-accent" />
            Data Security and Retention
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-foreground">
            We take reasonable measures to protect the information transmitted through our app. However, no internet transmission is completely secure.
          </p>
          <p className="text-foreground">
             Symptom data sent to the AI model may be processed by third-party AI providers according to their terms of service. For this demo, symptom data is not persistently stored by MediQuery beyond the current session unless explicitly stated for future features (which are not part of this version).
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Changes to This Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground">
            If you have any questions about this Privacy Policy, please contact us through the information provided on our Contact page.
          </p>
        </CardContent>
      </Card>
      <p className="text-center text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
    </div>
  );
}
