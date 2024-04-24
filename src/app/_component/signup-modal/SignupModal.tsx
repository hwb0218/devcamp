"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

import SignupForm from "@/app/_component/signup-form/SignupForm";

export default function SignupModal() {
  const router = useRouter();

  return (
    <div className="w-dvw h-full flex absolute inset-0 bg-black/55 dark:bg-slate-50/5">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Card className="w-[380px]">
          <CardHeader>
            <div className="flex items-center">
              <CardTitle>계정을 생성합니다</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto"
                onClick={() => {
                  router.back();
                }}
              >
                <X />
              </Button>
            </div>
            <CardDescription>필수 정보를 입력해볼게요.</CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
