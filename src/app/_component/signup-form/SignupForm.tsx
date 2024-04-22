"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import { Form } from "@/components/ui/form";
import Step1 from "./Step1";
import Step2 from "./Step2";
import ActionButtons from "./ActionButtons";

import { Schema, schema } from "@/schema/signup";

export default function SignupForm() {
  const [step, setStep] = useState(0);

  const form = useForm<Schema>({
    mode: "onSubmit",
    resolver: zodResolver(schema)
  });

  const onSubmit = (values: Schema) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-3 overflow-x-hidden">
        <motion.div className="space-y-3 *:mx-1" animate={{ translateX: `${step * -100}%` }}>
          <Step1 form={form} />
        </motion.div>
        <motion.div
          className="space-y-3 *:mx-1 absolute top-0 left-0 right-0"
          animate={{ translateX: `${(1 - step) * 100}%` }}
          style={{ translateX: `${(1 - step) * 100}%` }}
        >
          <Step2 form={form} />
        </motion.div>
        <ActionButtons form={form} setStep={setStep} />
      </form>
    </Form>
  );
}
