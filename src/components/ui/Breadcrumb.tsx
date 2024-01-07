import { PropsWithChildren, Children, ReactNode } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { PropsWithClassName } from '@/types/PropsWithClassName';
import { cn } from '@/utils/cn';

function BreadcrumbItem({ children }: PropsWithChildren) {
  return <li className="inline-flex items-center">{children}</li>;
}

type BreadcrumbProps = {
  children: ReactNode;
  separatorClassName?: string;
} & PropsWithClassName;

function Breadcrumb({ children, className, separatorClassName }: BreadcrumbProps) {
  return (
    <nav className={cn('flex', className)} aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2">
        {Children.map(children, (child, index) => {
          return (
            <>
              {!!index && (
                <ChevronRightIcon className={cn('h-[1em] w-[1em]', separatorClassName)} />
              )}
              {child}
            </>
          );
        })}
      </ol>
    </nav>
  );
}

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
