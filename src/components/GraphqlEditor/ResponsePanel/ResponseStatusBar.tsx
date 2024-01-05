import { Separator } from '@radix-ui/react-separator';
import { selectRequestStatus, selectResponse } from '@/redux/slices/graphql/graphqlSlice';
import { useAppSelector } from '@/utils/hooks/redux-hooks';
import Spinner from '@/components/ui/Spinner';
import { cn } from '@/utils/cn';
import Button from '@/components/ui/Button';
import { useLocalizationContext } from '@/providers/LocalizationProvider';

function getStatusColor(code: number) {
  switch (true) {
    case code >= 200 && code <= 299:
      return 'bg-editor-accent';
    case code >= 300:
      return 'bg-red-400';
    default:
      return 'bg-blue-400';
  }
}

function ResponseStatusBar() {
  const { t } = useLocalizationContext();
  const response = useAppSelector(selectResponse);
  const requestStatus = useAppSelector(selectRequestStatus);

  return (
    <div className="flex h-full items-center w-full">
      <Button active className="mr-5">
        {t.page.editor.response}
      </Button>
      <div className="ml-auto flex h-full py-3 gap-3 items-center">
        {requestStatus === 'pending' && <Spinner svgClassName="w-4 h-4" />}
        {response?.statusCode && (
          <>
            <div>{t.page.editor.status}: </div>
            <div
              className={cn(
                'text-sm py-0.5 flex px-1.5 rounded',
                getStatusColor(response.statusCode)
              )}
            >
              {response.statusCode}
            </div>
            <Separator
              className="h-full w-[1px] bg-editor-border"
              orientation="horizontal"
              decorative
            />
          </>
        )}
        {response?.responseTime && (
          <div className="text-sm p-1 rounded">{response.responseTime}ms</div>
        )}
      </div>
    </div>
  );
}

export default ResponseStatusBar;
