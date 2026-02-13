import HeaderVariants from "@/components/HeaderVariants";
import FooterVariants from "@/components/FooterVariants";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <HeaderVariants />
      {children}
      <FooterVariants />
    </div>
  );
}
