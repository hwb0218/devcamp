import * as z from "zod";

export const schema = z.object({
  email: z
    .string({ required_error: "올바른 이메일을 입력해주세요." })
    .email({ message: "올바른 이메일을 입력해주세요." }),
  password: z
    .string({ required_error: "비밀번호는 최소 6자리 이상이어야 합니다." })
    .min(6, { message: "비밀번호는 최소 6자리 이상이어야 합니다." })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/, {
      message: "8자 이상의 영어 대문자 또는 소문자, 숫자, 특수문자가 필요합니다"
    })
});

export type Schema = z.infer<typeof schema>;
