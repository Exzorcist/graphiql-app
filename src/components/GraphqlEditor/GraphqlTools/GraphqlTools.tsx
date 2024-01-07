import { ComponentType, memo, useState } from 'react';
import HeadersModel from './HeadersModel';
import GraphqlToolsHeader from './GraphqlToolsHeader';
import VariablesEditor from './VariablesEditor';

type Props = {
  onOpenChange?(): void;
  onToolChange?(tool: GraphqlTool): void;
  open?: boolean;
};

export type GraphqlTool = keyof typeof graphqlToolsMap;

const graphqlToolsMap = {
  variables: VariablesEditor,
  headers: HeadersModel,
} satisfies Record<string, ComponentType>;

const storageKey = 'activeGraphqlTool';

function initCurrentToolState(): GraphqlTool {
  const storageItem = localStorage.getItem(storageKey);
  return storageItem && storageItem in graphqlToolsMap ? (storageItem as GraphqlTool) : 'variables';
}

function GraphqlTools({ onOpenChange, onToolChange, open }: Props) {
  const [currentTool, setCurrentTool] = useState<GraphqlTool>(initCurrentToolState);
  const ToolComponent = graphqlToolsMap[currentTool];

  const handleToolClick = (tool: GraphqlTool) => () => {
    localStorage.setItem(storageKey, tool);
    setCurrentTool(tool);
    onToolChange?.(tool);
  };

  return (
    <div className="h-full relative">
      <GraphqlToolsHeader
        className="w-full absolute top-0 left-0 px-4 flex items-center h-[50px]"
        onVariablesClick={handleToolClick('variables')}
        onHeadersClick={handleToolClick('headers')}
        activeTool={open ? currentTool : null}
        onChevronClick={onOpenChange}
        open={open}
      />
      <div className="h-full flex flex-col pt-[50px]">
        <ToolComponent />
      </div>
    </div>
  );
}

export default memo(GraphqlTools);
