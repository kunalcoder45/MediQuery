import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MailIcon, UserIcon, MessageSquareIcon } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold text-primary">Contact Us</h1>
        <p className="text-xl text-muted-foreground mt-2">
          We'd love to hear from you!
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MailIcon className="h-6 w-6 mr-2 text-accent" />
            Get in Touch
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground mb-6">
            If you have any questions, feedback, or inquiries, please feel free to reach out. While this is a demo application and the form below is not functional, we appreciate your interest.
          </p>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center">
                <UserIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                Full Name
              </Label>
              <Input id="name" placeholder="Your Name" type="text" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center">
                <MailIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                Email Address
              </Label>
              <Input id="email" placeholder="your@email.com" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center">
                <MessageSquareIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                Message
              </Label>
              <Textarea id="message" placeholder="Your message..." rows={5} />
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Developer Credits</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground">
            MediQuery was brought to life by a dedicated team of developers and AI enthusiasts. This application serves as a demonstration of integrating AI for helpful, preliminary health guidance.
          </p>
          <p className="text-muted-foreground mt-2">
            Built with Next.js, Tailwind CSS, ShadCN UI, Genkit AI, and Gemini.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
