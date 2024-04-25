import { PropsWithChildren } from "react";

export default function Modal({ children }: PropsWithChildren) {
  return (
    <div className="w-dvw h-full flex absolute inset-0 bg-black/55 dark:bg-slate-50/5">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{children}</div>
    </div>
  );
}
