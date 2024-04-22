import SignupForm from "@/app/_component/signup-form/SignupForm";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>계정을 생성합니다</CardTitle>
          <CardDescription>필수 정보를 입력해볼게요.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}
