import { BookOpenIcon } from '@heroicons/react/24/outline';
import Button, { ButtonProps } from '@/components/ui/Button';
import { useLocalizationContext } from '@/providers/LocalizationProvider';

function SchemaButton(props: ButtonProps) {
  const { t } = useLocalizationContext();

  return (
    <Button variant="ghost-accented" {...props}>
      <span className="hidden lg:inline">{t.page.editor.schema}</span>
      <BookOpenIcon className="h-6 w-6 lg:hidden" />
    </Button>
  );
}

export default SchemaButton;
