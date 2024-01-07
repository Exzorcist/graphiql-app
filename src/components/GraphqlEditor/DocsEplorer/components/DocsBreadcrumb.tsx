import { HomeIcon } from '@heroicons/react/24/outline';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import { PropsWithClassName } from '@/types/PropsWithClassName';
import { GraphQLDocsEntry, isGraphQLField, isTypeWithFields } from '@/types/graphqlTypes';
import { cn } from '@/utils/cn';

type Props = {
  navStack: GraphQLDocsEntry[];
  onItemClick?(index: number): void;
} & PropsWithClassName;

const NAV_ROOT = 'Root';

function DocsBreadcrumb({ navStack, onItemClick, className }: Props) {
  const navItems = [NAV_ROOT, ...navStack] as const;

  return (
    <Breadcrumb className={cn('', className)} separatorClassName="w-[0.7em] h-[0.7em]">
      {navItems.map((item, index) => {
        let label;

        if (item === NAV_ROOT) {
          label = <HomeIcon className="w-5 h-5" />;
        } else if (isGraphQLField(item) || isTypeWithFields(item)) {
          label = item.name;
        } else {
          label = `(${item.name})`;
        }

        const isActive = navStack.length === index;

        return (
          <Breadcrumb.Item key={item === NAV_ROOT ? item : `${item.name}_${index}`}>
            <Button
              onClick={() => onItemClick?.(index - 1)}
              className={cn(
                item === NAV_ROOT && '-ml-1 -mr-1',
                item !== NAV_ROOT &&
                  'py-[2px] px-[3px] hover:bg-transparent hover:text-editor-text-color hover:underline',
                isActive && 'font-semibold'
              )}
            >
              {label}
            </Button>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}

export default DocsBreadcrumb;
