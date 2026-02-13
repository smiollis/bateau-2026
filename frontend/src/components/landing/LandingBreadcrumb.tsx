import { ChevronRight, Home } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface LandingBreadcrumbProps {
  items: BreadcrumbItem[];
}

const LandingBreadcrumb = ({ items }: LandingBreadcrumbProps) => (
  <nav aria-label="Fil d'Ariane" className="container-custom py-4">
    <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <li>
        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span>Accueil</span>
        </Link>
      </li>
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5" />
          {item.href ? (
            <Link href={item.href} className="hover:text-primary transition-colors">
              {item.name}
            </Link>
          ) : (
            <span className="text-primary font-medium">{item.name}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default LandingBreadcrumb;
