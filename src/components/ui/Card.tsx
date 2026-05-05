import * as React from "react";
import { cn } from "@/lib/utils/cn";

export function Card({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-n-100 bg-surface shadow-subtle",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-start justify-between gap-4 border-b border-n-100 px-5 py-4", className)} {...rest}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...rest }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-h3 font-medium tracking-tight text-ink", className)} {...rest}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...rest }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-body-sm text-n-500", className)} {...rest}>
      {children}
    </p>
  );
}

export function CardBody({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-5 py-4", className)} {...rest}>{children}</div>;
}

export function CardFooter({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center justify-between border-t border-n-100 px-5 py-3", className)} {...rest}>
      {children}
    </div>
  );
}
