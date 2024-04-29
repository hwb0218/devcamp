"use client";

import { useRouter } from "next/navigation";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

import Modal from "@/components/modal/Modal";
import SignupForm from "@/app/_component/signup/SignupForm";

export default function SignupModal() {
  const router = useRouter();

  return (
    <Modal>
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
    </Modal>
  );
}
