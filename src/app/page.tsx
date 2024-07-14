import Link from "next/link";

import { Button } from "@/components/ui/button";
import TestContext from "./(payment)/checkout/_component/TestContext";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <div className={cn("absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2")}>
      <Link href="/signup">
        <Button>회원가입</Button>
      </Link>
      <Link href="/login">
        <Button variant="secondary">로그인</Button>
      </Link>
      <Link href="/checkout">
        <Button>결제페이지</Button>
      </Link>
      <TestContext />
    </div>
  );
}
