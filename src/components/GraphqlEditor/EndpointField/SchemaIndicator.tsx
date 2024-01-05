import { selectGraphQLDocsSchema } from '@/redux/slices/graphql/graphqlSlice';
import { PropsWithClassName } from '@/types/PropsWithClassName';
import { useAppSelector } from '@/utils/hooks/redux-hooks';
import { cn } from '@/utils/cn';

function SchemaIndicator({ className }: PropsWithClassName) {
  const schema = useAppSelector(selectGraphQLDocsSchema);

  return (
    <div
      className={cn('rounded-full w-3 h-3', schema ? 'bg-green-500' : 'bg-red-500', className)}
      title={schema ? 'Schema is loaded' : 'Schema is not loaded'}
    />
  );
}

export default SchemaIndicator;
