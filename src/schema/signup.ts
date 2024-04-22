import { z } from "zod";

export const schema = z
  .object({
    username: z
      .string({ required_error: "이름은 2글자 이상이어야 합니다." })
      .min(1, { message: "이름은 2글자 이상이어야 합니다." }),
    email: z
      .string({ required_error: "올바른 이메일을 입력해주세요." })
      .email({ message: "올바른 이메일을 입력해주세요." }),
    phoneNumber: z
      .string({ required_error: "연락처는 11자리여야 합니다." })
      .length(11, { message: "연락처는 11자리여야 합니다." })
      .regex(/^010\d{8}$/, { message: "010으로 시작하는 11자리 숫자를 입력해주세요" }),
    role: z.string({ required_error: "카테고리를 선택하세요" }).min(1),
    password: z
      .string({ required_error: "비밀번호는 최소 6자리 이상이어야 합니다." })
      .min(6, { message: "비밀번호는 최소 6자리 이상이어야 합니다." })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/, {
        message: "8자 이상의 영어 대문자 또는 소문자, 숫자, 특수문자가 필요합니다"
      }),
    checkPassword: z
      .string({ required_error: "비밀번호는 최소 6자리 이상이어야 합니다." })
      .min(6, { message: "비밀번호는 최소 6자리 이상이어야 합니다." })
  })
  .superRefine(({ password, checkPassword }, ctx) => {
    if (password !== checkPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "패스워드가 일치하지 않습니다",
        path: ["checkPassword"]
      });
    }
  });

export type Schema = z.infer<typeof schema>;
