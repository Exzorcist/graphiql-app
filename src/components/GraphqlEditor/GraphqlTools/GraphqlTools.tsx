import { ComponentProps, memo } from 'react';
import GraphqlToolsHeader from './GraphqlToolsHeader';
import VariablesEditor from './VariablesEditor';

type Props = ComponentProps<typeof GraphqlToolsHeader>;

function GraphqlTools({ ...delegated }: Props) {
  return (
    <div className="h-full relative">
      <GraphqlToolsHeader
        className="w-full absolute top-0 left-0 px-4 flex items-center h-[50px]"
        {...delegated}
      />
      <div className="h-full pt-[50px]">
        <VariablesEditor />
      </div>
    </div>
  );
}

export default memo(GraphqlTools);
