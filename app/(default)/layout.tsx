import LandingLayout from "@/templates/tailspark/landing/layout";
import pagejson from "@/pagejson/en.json";

export default function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LandingLayout page={pagejson}>{children}</LandingLayout>;
}
