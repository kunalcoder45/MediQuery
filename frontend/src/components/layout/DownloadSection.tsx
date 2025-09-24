import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, Star, MessageCircle, MapPin, Pill } from "lucide-react"

export default function DownloadSection() {
    return (
        <section className="py-16 px-4 bg-secondary/50 w-full">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content Side */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl lg:text-5xl font-bold text-primary">Download MediQuery</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Your intelligent assistant for health guidance and local medicine discovery. Get instant access to
                                AI-powered symptom analysis, medicine suggestions, and nearby pharmacy locations right at your
                                fingertips.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                <span className="text-foreground">AI-powered symptom analysis</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                <span className="text-foreground">Over-the-counter medicine suggestions</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                <span className="text-foreground">Find nearby pharmacies</span>
                            </div>
                        </div>

                        {/* Download Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="/apk/mediquery.apk"
                                download="mediquery.apk"
                            >
                                <Button
                                    size="lg"
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-base"
                                >
                                    <Download className="w-5 h-5 mr-2" />
                                    Download Mediquery
                                </Button>
                            </a>
                        </div>
                        <div className="bg-white rounded-lg p-4 border-l-4 border-primary">
                            <p className="text-sm text-muted-foreground">
                                <strong className="text-foreground">Medical Disclaimer:</strong> MediQuery is not a substitute for
                                professional medical advice. Always consult healthcare professionals for medical concerns.
                            </p>
                        </div>
                    </div>

                    {/* Visual Side */}
                    <div className="relative">
                        <Card className="bg-card border-border p-8 lg:p-12">
                            <div className="relative mx-auto max-w-xs">
                                {/* Phone Mockup */}
                                <div className="relative bg-foreground rounded-3xl p-2 shadow-2xl">
                                    <div className="bg-background rounded-2xl overflow-hidden">
                                        {/* Phone Screen */}
                                        <div className="aspect-[10/19] md:aspect-[11/19] bg-gradient-to-br from-card to-muted p-6 flex flex-col">
                                            {/* Status Bar */}
                                            <div className="flex justify-between items-center text-xs text-muted-foreground mb-8">
                                                <span>9:41</span>
                                                <div className="flex gap-1">
                                                    <div className="w-4 h-2 bg-primary rounded-sm"></div>
                                                </div>
                                            </div>

                                            {/* App Content */}
                                            <div className="flex-1 space-y-6">
                                                <div className="text-center">
                                                    <div className="w-16 h-16 bg-primary rounded-2xl mx-auto mb-4 flex items-center justify-center">
                                                        <MessageCircle className="w-8 h-8 text-primary-foreground" />
                                                    </div>
                                                    <h3 className="font-bold text-foreground text-lg">MediQuery</h3>
                                                    <p className="text-sm text-muted-foreground">How are you feeling today?</p>
                                                </div>

                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-2 bg-primary/10 rounded-lg p-2">
                                                        <MessageCircle className="w-4 h-4 text-primary" />
                                                        <div className="h-2 bg-primary/30 rounded flex-1"></div>
                                                    </div>
                                                    <div className="flex items-center gap-2 bg-muted rounded-lg p-2">
                                                        <Pill className="w-4 h-4 text-muted-foreground" />
                                                        <div className="h-2 bg-muted-foreground/30 rounded w-3/4"></div>
                                                    </div>
                                                    <div className="flex items-center gap-2 bg-muted rounded-lg p-2">
                                                        <MapPin className="w-4 h-4 text-muted-foreground" />
                                                        <div className="h-2 bg-muted-foreground/30 rounded w-1/2"></div>
                                                    </div>
                                                </div>

                                                <div className="bg-primary/10 rounded-xl p-4 text-center">
                                                    <div className="w-8 h-8 bg-primary rounded-full mx-auto mb-2 flex items-center justify-center">
                                                        <Pill className="w-4 h-4 text-primary-foreground" />
                                                    </div>
                                                    <div className="h-2 bg-primary/30 rounded w-24 mx-auto"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Elements */}
                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-secondary rounded-full flex items-center justify-center shadow-lg">
                                    <Download className="w-6 h-6 text-secondary-foreground" />
                                </div>
                                <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
                                    <Star className="w-5 h-5 text-primary-foreground fill-current" />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
