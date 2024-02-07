import { Outlet } from "@remix-run/react";
import SlimShell from "~/UI/shell/slim-shell";

export default function FormPage() {
  return (
    <SlimShell>
      <Outlet />
    </SlimShell>
  );
}
