import React, { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Schema } from "../../../schema/signup";

interface Props {
  form: UseFormReturn<Schema>;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function ActionButtons({ form, setStep }: Props) {
  const handleClick = () => {
    const fields = ["username", "email", "phoneNumber", "role"] as const;
    form.trigger(fields);

    const isAllFieldsValid = fields.every(fieldName => {
      const fieldState = form.getFieldState(fieldName);
      return fieldState.isDirty && !fieldState.invalid;
    });

    if (isAllFieldsValid) {
      setStep(1);
    }
  };

  return (
    <div className="flex gap-2">
      <Button type="button" onClick={handleClick}>
        다음 단계로
        <ArrowRight className="w-4 h-4 ml-2" />{" "}
      </Button>
      <Button>계정 등록하기</Button>
      <Button variant="ghost">이전 단계로</Button>
    </div>
  );
}
