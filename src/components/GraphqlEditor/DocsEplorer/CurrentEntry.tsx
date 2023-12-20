import { getNamedType } from 'graphql';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Button from '@/components/ui/Button';
import { GraphQLDocsEntry, isGraphQLField } from '@/types/graphqlTypes';

type Props = {
  entry: GraphQLDocsEntry;
  onGoBack?(): void;
};

function CurrentEntry({ entry, onGoBack }: Props) {
  const label = isGraphQLField(entry)
    ? `${entry.name}: ${getNamedType(entry.type).toString()}`
    : getNamedType(entry).toString();

  return (
    <div className="flex gap-2 items-center">
      <Button onClick={onGoBack}>
        <ArrowLeftIcon className="w-4 h-4" />
      </Button>
      {label}
    </div>
  );
}

export default CurrentEntry;
