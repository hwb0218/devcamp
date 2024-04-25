"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useRouter } from "next/navigation";

import Modal from "@/components/modal/Modal";
import LoginForm from "./LoginForm";

export default function LoginModal() {
  const router = useRouter();

  return (
    <Modal>
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle className="mx-auto">로그인</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-[12px] right-[24px]"
            onClick={() => {
              router.back();
            }}
          >
            <X />
          </Button>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </Modal>
  );
}
