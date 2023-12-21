import { GraphQLObjectType } from 'graphql';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Button from '@/components/ui/Button';
import { GraphQLDocsEntry } from '@/types/graphqlTypes';
import { useDocsExplorer } from '../DocsExplorer';
import { PropsWithClassName } from '@/types/PropsWithClassName';
import { cn } from '@/utils/cn';
import GraphQLType from './GraphQLType';

type Props = {
  entry: GraphQLDocsEntry;
} & PropsWithClassName;

function CurrentEntry({ entry, className }: Props) {
  const { leaveEntry } = useDocsExplorer();

  const label =
    entry instanceof GraphQLObjectType ? (
      entry.toString()
    ) : (
      <>
        {entry.name}: <GraphQLType>{entry.type.toString()}</GraphQLType>
      </>
    );

  return (
    <div className={cn('flex gap-2 items-center', className)}>
      <Button onClick={leaveEntry}>
        <ArrowLeftIcon className="w-4 h-4" />
      </Button>
      <h4 className="font-semibold">{label}</h4>
    </div>
  );
}

export default CurrentEntry;
