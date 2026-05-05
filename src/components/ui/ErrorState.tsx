import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "./Button";

export function ErrorState({
  title = "Une erreur est survenue",
  description,
  onRetry,
  retryLabel = "Réessayer",
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-danger/20 bg-danger-soft px-6 py-10 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-danger">
        <AlertTriangle className="h-5 w-5" />
      </span>
      <div className="space-y-1">
        <p className="text-body font-medium text-danger">{title}</p>
        {description ? <p className="text-body-sm text-n-600 max-w-sm mx-auto">{description}</p> : null}
      </div>
      {onRetry ? (
        <Button size="sm" variant="outline" onClick={onRetry}>
          {retryLabel}
        </Button>
      ) : null}
    </div>
  );
}
