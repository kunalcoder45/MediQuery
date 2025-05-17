import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Users, Lightbulb, ShieldCheck, LaptopMinimal } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold text-primary">About MediQuery</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Your intelligent assistant for health guidance and local medicine discovery.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="h-6 w-6 mr-2 text-accent" />
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground">
            MediQuery aims to provide accessible and preliminary health guidance by leveraging the power of artificial intelligence. We understand that feeling unwell can be stressful, and finding quick, understandable information is crucial. Our chatbot is designed to analyze your described symptoms and suggest potential over-the-counter remedies, along with helping you find nearby pharmacies.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-6 w-6 mr-2 text-accent" />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            <strong>1. Describe Your Symptoms:</strong> Simply tell our chatbot how you're feeling in natural language.
          </p>
          <p className="text-foreground">
            <strong>2. AI Analysis:</strong> Our advanced AI model processes your input to identify patterns and potential concerns.
          </p>
          <p className="text-foreground">
            <strong>3. Medicine Suggestions:</strong> Based on the analysis, MediQuery suggests over-the-counter medicines, including dosage information and common uses.
          </p>
          <p className="text-foreground">
            <strong>4. Find Nearby Pharmacies:</strong> If you wish, MediQuery can help you locate pharmacies in your vicinity where you might find these medicines.
          </p>
        </CardContent>
      </Card>

      <Card className="border-destructive bg-destructive/10">
        <CardHeader>
          <CardTitle className="flex items-center text-destructive">
            <AlertCircle className="h-6 w-6 mr-2" />
            Responsible Usage & Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive-foreground font-semibold !text-black">
            MediQuery is not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
          <ul className="list-disc list-inside mt-2 text-destructive-foreground/90 space-y-1 !text-gray-800">
            <li>The information provided by MediQuery is for informational purposes only.</li>
            <li>Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</li>
            <li>Never disregard professional medical advice or delay in seeking it because of something you have read or heard from MediQuery.</li>
            <li>If you think you may have a medical emergency, call your doctor or emergency services immediately.</li>
            <li>Reliance on any information provided by MediQuery is solely at your own risk.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShieldCheck className="h-6 w-6 mr-2 text-accent" />
            Our Commitment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground">
            We are committed to providing a helpful and user-friendly tool. We continuously work on improving our AI models and user experience. Your privacy is important to us; please review our Privacy Policy for details on how we handle your data.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
          <LaptopMinimal className="h-6 w-6 mr-2 text-accent" /> Developer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground">
            Developed by <strong>Kunal Sharma</strong>.
          </p>
          <a
            href="https://kunalportfolio45.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline mt-2 inline-block"
          >
            Visit Portfolio
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
