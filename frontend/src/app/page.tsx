import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  MessageCircleIcon,
  MapPinIcon,
  PillIcon,
} from "lucide-react";
import DownloadSection from "@/components/layout/DownloadSection";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <Image
              src="/doctor.png"
              alt="Hero Illustration"
              width={600}
              height={400}
              className="mr-auto aspect-video overflow-hidden rounded-xl object-contain sm:w-full -translate-x-4"
            />
            <div className="flex flex-col justify-center space-y-4 mr-5">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Feeling Unwell? Talk to MediQuery.
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Describe your symptoms and get instant medicine suggestions
                  with nearby pharmacy info. MediQuery is your smart companion
                  for quick health guidance.
                </p>
              </div>
              <Link href="/chat">
                <Button size="lg" className="rounded-full">
                  Start Chat <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/20 px-3 py-1 text-sm text-primary-foreground">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                How MediQuery Helps You
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get quick, AI-powered suggestions for your health concerns and
                find help nearby.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16 mt-12">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <MessageCircleIcon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Symptom Analysis</h3>
              <p className="text-muted-foreground">
                Describe your symptoms in plain language and our AI will
                provide potential insights.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <PillIcon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Medicine Suggestions</h3>
              <p className="text-muted-foreground">
                Receive suggestions for over-the-counter medications relevant
                to your symptoms.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <MapPinIcon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Nearby Pharmacies</h3>
              <p className="text-muted-foreground">
                Locate pharmacies near you to quickly find the suggested
                medications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Ready to Get Started?
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Click the button below to start a chat with MediQuery and find
              the guidance you need.
            </p>
          </div>
          <Link href="/chat">
            <Button size="lg" className="rounded-full">
              Chat with MediQuery
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      <DownloadSection />
    </div>
  );
}
