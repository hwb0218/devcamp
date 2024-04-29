"use client";

import { ChevronRight } from "lucide-react";

import { uuid } from "@/utils/uuid";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface Props {
  list: Array<{ path: string; title: string }>;
}

export default function Breadcrumb({ list }: Props) {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <div className="pt-16 pb-20 flex justify-center">
      <ol className="flex">
        {list.map(({ path, title }, index) => (
          <li
            key={`${uuid()}-${title}`}
            className={cn("flex font-medium text-stone-300 text-sm leading-[1.7]", [
              path === pathname && "text-stone-900 dark:text-stone-500"
            ])}
          >
            {`0${index + 1} ${title}`}
            {list.length > index + 1 && <ChevronRight className={cn("mx-3 stroke-1 stroke-stone-300")} />}
          </li>
        ))}
      </ol>
    </div>
  );
}
