"use client";

import React, { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Schema } from "@/schema/signup";

interface Props {
  form: UseFormReturn<Schema>;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function ActionButtons({ form, step, setStep }: Props) {
  const handleClickNextStep = async () => {
    const fields = ["username", "email", "phoneNumber", "role"] as const;
    await form.trigger(fields);

    const isAllFieldsValid = fields.every(fieldName => {
      const fieldState = form.getFieldState(fieldName);
      return fieldState.isDirty && !fieldState.invalid;
    });

    if (isAllFieldsValid) {
      setStep(1);
    }
  };

  const handleClickPrevStep = () => {
    setStep(0);
  };

  return (
    <div className="flex gap-2">
      {step === 0 && (
        <Button type="button" onClick={handleClickNextStep}>
          다음 단계로
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      )}
      {step === 1 && (
        <>
          <Button type="submit">계정 등록하기</Button>
          <Button variant="ghost" type="button" onClick={handleClickPrevStep}>
            이전 단계로
          </Button>
        </>
      )}
    </div>
  );
}
