"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { RiDoorLockFill } from "@remixicon/react";

// 🔑 Firebase
import { auth } from "@/lib/firebase"; // <-- tumhare config ka path
import { sendPasswordResetEmail } from "firebase/auth";

const FormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export const ForgetPass = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [message, setMessage] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
    setIsLoading(true);
    setServerError("");
    setMessage("");

    try {
      const actionCodeSettings = {
        url: "https://mediquery.vercel.app/auth/reset-done", // 👈 custom redirect
        handleCodeInApp: true,
      };

      await sendPasswordResetEmail(auth, data.email, actionCodeSettings);
      setMessage("✅ Password reset email sent! Please check your inbox.");
    } catch (error: any) {
      console.error("Password reset error:", error);
      setServerError(error.message || "Failed to send reset email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex w-full max-w-[440px] shadow-none flex-col gap-6 p-5 md:p-8 mx-auto">
      <CardHeader className="flex flex-col items-center gap-2">
        <div className="relative flex size-[68px] shrink-0 items-center justify-center rounded-full backdrop-blur-xl md:size-24 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-neutral-500 before:to-transparent before:opacity-10">
          <div className="relative z-10 flex size-12 items-center justify-center rounded-full bg-background dark:bg-muted/80 shadow-xs ring-1 ring-inset ring-border md:size-16">
            <RiDoorLockFill className="size-6 text-muted-foreground/80 md:size-8" />
          </div>
        </div>

        <div className="flex flex-col space-y-1.5 text-center">
          <CardTitle className="md:text-xl font-medium">
            Forgot your password?
          </CardTitle>
          <CardDescription className="tracking-[-0.006em]">
            Enter your email address to reset your password.
          </CardDescription>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="p-0">
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Email <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="name@domain.com"
                      className="rounded-lg"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Continue"}
            </Button>

            {message && (
              <p className="text-green-600 text-sm font-medium">{message}</p>
            )}
            {serverError && (
              <p className="text-red-600 text-sm font-medium">{serverError}</p>
            )}

            <p className="text-muted-foreground text-xs">
              Please enter the email address associated with your account. You
              will receive an email with instructions on how to reset your
              password.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
