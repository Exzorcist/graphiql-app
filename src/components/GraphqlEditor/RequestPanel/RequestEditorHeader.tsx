import { useLocalizationContext } from '@/providers/LocalizationProvider';
import Prettifying from '../Prettifying/Prettifying';
import Button from '@/components/ui/Button';

function RequestEditorHeader() {
  const { t } = useLocalizationContext();

  return (
    <div className="flex w-full">
      <Button active>{t.page.editor.request}</Button>
      <Prettifying className="ml-auto" />
    </div>
  );
}

export default RequestEditorHeader;
