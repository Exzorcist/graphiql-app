import { ComponentProps } from 'react';
import { cn } from '@/utils/cn';
import { useAppSelector } from '@/utils/hooks/redux-hooks';
import { selectGraphqlSchema } from '@/redux/graphqlSlice';

function DocsExplorer({ className, ...delegated }: ComponentProps<'div'>) {
  const graphqlSchema = useAppSelector(selectGraphqlSchema);

  console.log(graphqlSchema);

  return (
    <div
      className={cn('bg-editor-primary flex items-center justify-center h-full w-full', className)}
      {...delegated}
    >
      Docs goes here
    </div>
  );
}

export default DocsExplorer;
