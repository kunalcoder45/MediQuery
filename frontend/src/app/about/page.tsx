import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertCircle, 
  Users, 
  Lightbulb, 
  ShieldCheck, 
  LaptopMinimal,
  Target,
  Zap,
  Brain,
  MapPin,
  Heart,
  ExternalLink,
  Code,
  Sparkles,
  Award,
  Globe
} from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced AI processes your symptoms using natural language understanding"
    },
    {
      icon: Target,
      title: "Personalized Suggestions",
      description: "Get tailored medicine recommendations based on your specific symptoms"
    },
    {
      icon: MapPin,
      title: "Local Pharmacy Finder",
      description: "Locate nearby pharmacies to purchase recommended medicines"
    },
    {
      icon: Zap,
      title: "Quick Response",
      description: "Get instant preliminary health guidance when you need it most"
    }
  ];

  const commitments = [
    {
      icon: Heart,
      title: "User-Centric Design",
      description: "Built with healthcare accessibility and user experience in mind"
    },
    {
      icon: ShieldCheck,
      title: "Privacy Protection",
      description: "Your health data is handled with the utmost care and security"
    },
    {
      icon: Sparkles,
      title: "Continuous Improvement",
      description: "Regular updates and enhancements based on user feedback"
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Reliable information backed by medical databases and AI accuracy"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 rounded-full mb-6">
            <Heart className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 bg-clip-text text-transparent mb-4">
            About MediQuery
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your intelligent assistant for health guidance and local medicine discovery
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-12">
          <Card className="shadow-2xl border-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 backdrop-blur-sm p-5">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center justify-center text-3xl">
                <Lightbulb className="h-8 w-8 mr-3 text-yellow-500" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-center leading-relaxed max-w-4xl mx-auto text-muted-foreground">
                MediQuery aims to provide accessible and preliminary health guidance by leveraging the power of artificial intelligence. 
                We understand that feeling unwell can be stressful, and finding quick, understandable information is crucial. 
                Our chatbot is designed to analyze your described symptoms and suggest potential over-the-counter remedies, 
                along with helping you find nearby pharmacies.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">How MediQuery Works</h2>
            <p className="text-lg text-muted-foreground">Simple, fast, and intelligent health assistance</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Describe Symptoms",
                description: "Tell our chatbot how you're feeling in natural language",
                icon: Users,
                color: "from-blue-500 to-blue-600"
              },
              {
                step: "02", 
                title: "AI Analysis",
                description: "Advanced AI processes your input to identify patterns",
                icon: Brain,
                color: "from-green-500 to-green-600"
              },
              {
                step: "03",
                title: "Medicine Suggestions",
                description: "Get OTC medicine recommendations with dosage info",
                icon: Target,
                color: "from-purple-500 to-purple-600"
              },
              {
                step: "04",
                title: "Find Pharmacies",
                description: "Locate nearby pharmacies to purchase medicines",
                icon: MapPin,
                color: "from-pink-500 to-pink-600"
              }
            ].map((item, index) => (
              <Card key={index} className="shadow-xl border-0 bg-white/80 p-2 dark:bg-slate-900/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="text-center pb-2">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className={`text-2xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                    {item.step}
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

        {/* Features Grid */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Key Features</h2>
            <p className="text-lg text-muted-foreground">What makes MediQuery special</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-xl border-0 bg-white/80 p-2 dark:bg-slate-900/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-green-500 mr-4">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Disclaimer Section - Full Width */}
        <div className="mb-12">
          <Card className="shadow-2xl border-red-200 bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm p-4 pt-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-center text-2xl text-red-600 pb-2">
                <AlertCircle className="h-8 w-8 mr-3" />
                Important Medical Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-100 dark:bg-red-900/30 p-6 rounded-lg border border-red-200">
                <p className="text-lg font-semibold text-red-800 dark:text-red-200 text-center mb-4">
                  MediQuery is not a substitute for professional medical advice, diagnosis, or treatment.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-red-700 dark:text-red-300">
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                      Information provided is for informational purposes only
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                      Always consult qualified health providers for medical advice
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                      Never delay seeking professional medical care
                    </li>
                  </ul>
                  <ul className="space-y-2 text-red-700 dark:text-red-300">
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                      Call emergency services for medical emergencies
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                      Use of information is at your own risk
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                      This is a preliminary guidance tool only
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Commitments Grid */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Commitments</h2>
            <p className="text-lg text-muted-foreground">What we promise to deliver</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commitments.map((commitment, index) => (
              <Card key={index} className="shadow-xl border-0 bg-white/80 p-2 dark:bg-slate-900/80 backdrop-blur-sm text-center hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="pb-2">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <commitment.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{commitment.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {commitment.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Developer Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-2xl border-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm p-4">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl pb-2">
                <Code className="h-6 w-6 mr-3 text-purple-500" />
                Meet the Developer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <LaptopMinimal className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Kunal Sharma</h3>
                  <p className="text-muted-foreground">Full Stack Developer & AI Enthusiast</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                Passionate about creating innovative healthcare solutions that make medical information more accessible through technology.
              </p>
              <a
                href="https://kunalportfolio45.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
              >
                <Globe className="h-4 w-4 mr-2" />
                Visit Portfolio
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 backdrop-blur-sm p-5">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Sparkles className="h-6 w-6 mr-3 text-blue-500" />
                Technology Stack
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground mb-4">
                Built with modern technologies for optimal performance and user experience:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Next.js", color: "bg-black text-white" },
                  { name: "React", color: "bg-blue-500 text-white" },
                  { name: "TypeScript", color: "bg-blue-600 text-white" },
                  { name: "Tailwind CSS", color: "bg-teal-500 text-white" },
                  { name: "ShadCN UI", color: "bg-slate-800 text-white" },
                  { name: "Gemini AI", color: "bg-purple-500 text-white" }
                ].map((tech, index) => (
                  <span key={index} className={`px-3 py-2 rounded-lg text-sm font-medium text-center ${tech.color}`}>
                    {tech.name}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}