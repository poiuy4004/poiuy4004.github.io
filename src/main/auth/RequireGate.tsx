import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isGateOpen } from "./gate";

type RequireGateProps = {
  children: ReactNode;
};

export default function RequireGate({ children }: RequireGateProps) {
  if (!isGateOpen()) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
