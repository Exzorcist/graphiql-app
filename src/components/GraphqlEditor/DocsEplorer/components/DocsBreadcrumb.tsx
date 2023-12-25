import Breadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import { PropsWithClassName } from '@/types/PropsWithClassName';
import { GraphQLDocsEntry, isGraphQLField, isTypeWithFields } from '@/types/graphqlTypes';
import { cn } from '@/utils/cn';

type Props = {
  navStack: GraphQLDocsEntry[];
  onItemClick?(index: number): void;
} & PropsWithClassName;

function DocsBreadcrumb({ navStack, onItemClick, className }: Props) {
  return (
    <Breadcrumb className={cn('text-sm', className)} separatorClassName="w-[0.7em] h-[0.7em]">
      {['Root', ...navStack].map((item, index) => {
        let label;

        if (typeof item === 'string') {
          label = item;
        } else if (isGraphQLField(item) || isTypeWithFields(item)) {
          label = item.name;
        } else {
          label = `(${item.name})`;
        }

        const isActive = navStack.length === index;

        return (
          <Breadcrumb.Item key={typeof item === 'string' ? item : `${item.name}_${index}`}>
            <Button
              onClick={() => onItemClick?.(index - 1)}
              className={cn(
                'text-sm py-[2px] px-[3px] hover:bg-transparent hover:text-editor-text-color hover:underline',
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
