"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Volume2Icon,
  Leaf,
  InfoIcon,
  CalendarDaysIcon,
  AlertTriangle,
  CheckCircle,
  Clock,
  PackageIcon
} from "lucide-react";

interface HomeRemedy {
  remedyName: string;
  ingredients: string;
  preparation: string;
  usage: string;
  benefits: string;
  precautions: string;
  duration: string;
  effectiveness: string;
}

interface HomeRemedyCardProps {
  remedy: HomeRemedy;
}

const speakText = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
};

export function HomeRemedyCard({ remedy }: HomeRemedyCardProps) {
  return (
    <Card className="w-full bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 shadow-lg rounded-xl overflow-hidden border border-green-100/50 hover:shadow-xl transition-all duration-300">
      {/* Header with Remedy Name */}
      <CardHeader className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-5 border-b border-green-100/50">
        <div className="flex justify-between items-start mb-3">
          <CardTitle className="flex items-center text-gray-800 text-xl font-bold">
            <Leaf className="w-6 h-6 mr-3 text-green-600" />
            {remedy.remedyName}
            <button
              type="button"
              className="ml-3 p-2 rounded-full hover:bg-green-100 transition-colors duration-200"
              onClick={() => speakText(remedy.remedyName)}
            >
              <Volume2Icon className="w-5 h-5 text-green-600 hover:text-green-700" />
            </button>
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        {/* Key Information Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50/50 p-3 rounded-lg border border-green-100">
            <div className="flex items-center mb-2">
              <Clock className="w-4 h-4 mr-2 text-green-600" />
              <span className="text-xs font-semibold text-green-700">Duration</span>
            </div>
            <p className="text-sm text-gray-700 font-medium">{remedy.duration}</p>
          </div>

          <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100">
            <div className="flex items-center mb-2">
              <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-xs font-semibold text-blue-700">Effectiveness</span>
            </div>
            <p className="text-sm text-gray-700 font-medium">{remedy.effectiveness}</p>
          </div>
        </div>

        {/* Ingredients */}
        {remedy.ingredients && (
          <div className="bg-purple-50/50 p-3 rounded-lg border border-purple-100">
            <div className="flex items-center mb-2">
              <PackageIcon className="w-4 h-4 mr-2 text-purple-600" />
              <span className="text-xs font-semibold text-purple-700">Ingredients</span>
            </div>
            <p className="text-sm text-gray-700 font-medium">{remedy.ingredients}</p>
          </div>
        )}

        {/* Preparation */}
        {remedy.preparation && (
          <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-200">
            <div className="flex items-start mb-2">
              <InfoIcon className="w-4 h-4 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-xs font-semibold text-blue-700">Preparation</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{remedy.preparation}</p>
          </div>
        )}

        {/* Usage */}
        {remedy.usage && (
          <div className="bg-green-50/50 p-3 rounded-lg border border-green-200">
            <div className="flex items-start mb-2">
              <CalendarDaysIcon className="w-4 h-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-xs font-semibold text-green-700">How to Use</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{remedy.usage}</p>
          </div>
        )}

        {/* Benefits */}
        {remedy.benefits && (
          <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-200">
            <div className="flex items-start mb-2">
              <CheckCircle className="w-4 h-4 mr-2 text-emerald-600 mt-0.5 flex-shrink-0" />
              <span className="text-xs font-semibold text-emerald-700">Benefits</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{remedy.benefits}</p>
          </div>
        )}

        {/* Precautions */}
        {remedy.precautions && (
          <div className="bg-yellow-50/50 p-3 rounded-lg border border-yellow-200">
            <div className="flex items-start mb-2">
              <AlertTriangle className="w-4 h-4 mr-2 text-yellow-600 mt-0.5 flex-shrink-0" />
              <span className="text-xs font-semibold text-yellow-700">Precautions</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{remedy.precautions}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}