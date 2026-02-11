import Link from 'next/link';
import { forwardRef } from 'react';
import { usePathname } from 'next/navigation';
import cn from '@/lib/utils';

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, className, activeClassName, pendingClassName, children, ...props }, ref) => {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href));
    return (
      <Link href={href} className={cn(className, isActive && activeClassName)} {...props} ref={ref}>
        {children}
      </Link>
    );
  },
);

NavLink.displayName = 'NavLink';

export { NavLink };
export default NavLink;
