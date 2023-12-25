import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Button from '@/components/ui/Button';
import { GraphQLDocsEntry } from '@/types/graphqlTypes';
import { useDocsExplorer } from '../DocsExplorer';
import { PropsWithClassName } from '@/types/PropsWithClassName';
import { cn } from '@/utils/cn';
import EntryLabel from './EntryLabel';

type Props = {
  entry: GraphQLDocsEntry;
} & PropsWithClassName;

function CurrentEntry({ entry, className }: Props) {
  const { leaveEntry } = useDocsExplorer();

  return (
    <div className={cn('flex gap-2 items-center', className)}>
      <Button onClick={leaveEntry}>
        <ArrowLeftIcon className="w-4 h-4" />
      </Button>
      <h4 className="font-semibold">
        <EntryLabel entry={entry} />
      </h4>
    </div>
  );
}

export default CurrentEntry;
