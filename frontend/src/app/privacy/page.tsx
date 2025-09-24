import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShieldAlert,
  Info,
  Database,
  Users,
  Shield,
  Eye,
  Lock,
  Server,
  FileText,
  Mail,
  Calendar,
  Globe,
  CheckCircle,
  AlertTriangle,
  UserCheck,
  Settings
} from "lucide-react";

export default function PrivacyPage() {
  const dataTypes = [
    {
      icon: FileText,
      title: "Symptom Information",
      description: "Descriptions you provide are sent to our AI model for analysis",
      type: "health"
    },
    {
      icon: Eye,
      title: "Usage Analytics",
      description: "Anonymous interaction patterns to improve the application",
      type: "analytics"
    },
    {
      icon: UserCheck,
      title: "No Personal Accounts",
      description: "We don't collect names, emails, or personal identification",
      type: "identity"
    },
    {
      icon: Globe,
      title: "Session Data",
      description: "Temporary data stored only during your current session",
      type: "session"
    }
  ];

  const usageReasons = [
    {
      icon: Settings,
      title: "Service Delivery",
      description: "Symptom analysis and medicine suggestion generation",
      priority: "primary"
    },
    {
      icon: CheckCircle,
      title: "App Improvement",
      description: "Anonymized usage data helps enhance user experience",
      priority: "secondary"
    },
    {
      icon: Shield,
      title: "No Marketing",
      description: "We never use your data for advertising or marketing",
      priority: "commitment"
    }
  ];

  const securityMeasures = [
    {
      icon: Lock,
      title: "Data Encryption",
      description: "All data transmission is encrypted and secured"
    },
    {
      icon: Server,
      title: "Secure Processing",
      description: "Third-party AI providers follow strict security protocols"
    },
    {
      icon: Database,
      title: "Minimal Retention",
      description: "Data is not persistently stored beyond current sessions"
    },
    {
      icon: Shield,
      title: "Privacy by Design",
      description: "Built with privacy considerations from the ground up"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">

        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full mb-6">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us at MediQuery
          </p>
          <div className="mt-6 inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm">
            <Calendar className="h-4 w-4 mr-2 text-blue-600" />
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Introduction Section */}
        <div className="mb-12">
          <Card className="shadow-2xl border-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm p-5">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center justify-center text-3xl">
                <Info className="h-8 w-8 mr-3 text-blue-500" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-center leading-relaxed max-w-4xl mx-auto text-muted-foreground">
                This Privacy Policy explains how MediQuery ("we," "us," or "our") collects, uses, and discloses information
                about you when you use our application. This is a demo application, and data handling practices reflect this context.
                We are committed to protecting your privacy while providing valuable health guidance services.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Information Collection Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Information We Collect</h2>
            <p className="text-lg text-muted-foreground">Understanding what data we work with</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataTypes.map((item, index) => (
              <Card key={index} className="shadow-xl border-0 bg-white/80 dark:bg-slate-900/80 p-2 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="text-center pb-2">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${item.type === 'health' ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                      item.type === 'analytics' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                        item.type === 'identity' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                          'bg-gradient-to-r from-purple-500 to-violet-500'
                    }`}>
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Usage Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">How We Use Your Information</h2>
            <p className="text-lg text-muted-foreground">Transparent about our data usage</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {usageReasons.map((reason, index) => (
              <Card key={index} className={`shadow-xl border-0 backdrop-blur-sm p-2 hover:shadow-2xl transition-all duration-300 ${reason.priority === 'primary' ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10' :
                  reason.priority === 'secondary' ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10' :
                    'bg-gradient-to-br from-purple-500/10 to-violet-500/10'
                }`}>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <div className={`p-3 rounded-full mr-4 ${reason.priority === 'primary' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                        reason.priority === 'secondary' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                          'bg-gradient-to-r from-purple-500 to-violet-500'
                      }`}>
                      <reason.icon className="h-6 w-6 text-white" />
                    </div>
                    {reason.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Security Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Data Security & Protection</h2>
            <p className="text-lg text-muted-foreground">How we keep your information safe</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityMeasures.map((measure, index) => (
              <Card key={index} className="shadow-xl border-0 bg-white/80 p-2 dark:bg-slate-900/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <div className="p-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 mr-4">
                      <measure.icon className="h-6 w-6 text-white" />
                    </div>
                    {measure.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{measure.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Security Notice */}
          <Card className="mt-6 shadow-xl border-yellow-200 bg-yellow-50/80 dark:bg-yellow-900/20 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Security Notice</h3>
                  <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                    We take reasonable measures to protect information transmitted through our app. However, no internet transmission
                    is completely secure. Symptom data may be processed by third-party AI providers according to their terms of service.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Grid - Policy Updates & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-2xl border-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm p-4">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <FileText className="h-6 w-6 mr-3 text-blue-500" />
                Policy Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational,
                legal, or regulatory reasons.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="font-medium text-blue-800 dark:text-blue-200">Notification Promise</span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
                  We will notify you of any changes by posting the new Privacy Policy on this page with an updated date.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm p-4">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Mail className="h-6 w-6 mr-3 text-green-500" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy or our data practices, we're here to help.
              </p>
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium text-green-800 dark:text-green-200">Get in Touch</span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                  Please contact us through the information provided on our Contact page for any privacy-related inquiries.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}