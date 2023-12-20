import { PropsWithChildren, ReactElement, Children } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

function BreadcrumbItem({ children }: PropsWithChildren) {
  return <li className="inline-flex items-center">{children}</li>;
}

type BreadcrumbProps = {
  children: ReactElement<typeof BreadcrumbItem>;
};

function Breadcrumb({ children }: BreadcrumbProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {Children.map(children, (child, index) => {
          return (
            <>
              {index && <ChevronRightIcon className="h-6 w-6 ml-2 mr-2" />}
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
