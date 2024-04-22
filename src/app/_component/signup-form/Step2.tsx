import React, { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

import { Schema } from "../../../schema/signup";

interface Props {
  form: UseFormReturn<Schema>;
}

export default function Step2({ form }: Props) {
  return <div>Step2</div>;
}
