import { PlayIcon } from '@heroicons/react/24/outline';
import { Kind, OperationDefinitionNode } from 'graphql';
import { useInitRequestMutation } from '@/redux/slices/graphql/graphqlApi';
import { useLocalizationContext } from '@/providers/LocalizationProvider';
import { selectRequestAST } from '@/redux/slices/graphql/graphqlSlice';
import { PropsWithClassName } from '@/types/PropsWithClassName';
import { useAppSelector } from '@/utils/hooks/redux-hooks';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import Button from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { cn } from '@/utils/cn';

function SendRequestButton({ className }: PropsWithClassName) {
  const { t } = useLocalizationContext();
  const isMobileL = useBreakpoint('min-mobile-lg');
  const requestAST = useAppSelector(selectRequestAST);
  const [initRequest, { isLoading }] = useInitRequestMutation();

  const operations = requestAST?.definitions
    .filter((node) => node.kind === Kind.OPERATION_DEFINITION)
    .map((node) => {
      const operationNode = node as OperationDefinitionNode;
      const label = operationNode.name
        ? operationNode.name.value
        : `<Unnamed ${operationNode.operation}>`;

      return { label, name: operationNode.name?.value };
    });

  const shouldRenderDropdown = !!operations && operations.length > 1;

  const button = (
    <Button
      variant="solid"
      disabled={isLoading}
      onClick={shouldRenderDropdown ? undefined : () => initRequest()}
      className={cn('px-5 rounded-none rounded-r outline-none', className)}
    >
      {isMobileL ? t.page.editor.sendRequest : <PlayIcon className="w-6 h-6" />}
    </Button>
  );

  return shouldRenderDropdown ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isLoading}>
        {button}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-editor-primary p-0 border border-editor-border z-10 text-editor-text-color w-[--radix-dropdown-menu-trigger-width] cursor-pointer max-h-[200px] overflow-auto fancy-scrollbar">
        {operations.map((operation, index) => (
          <DropdownMenuItem
            key={`${operation.label}_${index}`}
            onClick={() => initRequest(operation.name)}
            className={cn(
              'cursor-pointer hover:bg-editor-secondary py-2 flex justify-center text-center',
              index > 0 && 'border-t border-editor-border'
            )}
          >
            {operation.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    button
  );
}

export default SendRequestButton;
