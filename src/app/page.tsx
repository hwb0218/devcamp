import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2">
      <Link href="/signup">
        <Button>회원가입</Button>
      </Link>
      <Link href="/login">
        <Button variant="secondary">로그인</Button>
      </Link>
      <Link href="/checkout">
        <Button>결제페이지</Button>
      </Link>
    </div>
  );
}
