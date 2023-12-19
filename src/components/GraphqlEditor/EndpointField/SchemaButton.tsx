import Button, { ButtonProps } from '@/components/ui/Button';
import { useLocalizationContext } from '@/providers/LocalizationProvider';

function SchemaButton(props: ButtonProps) {
  const { t } = useLocalizationContext();

  return (
    <Button variant="ghost-accented" {...props}>
      {t.page.editor.Schema}
    </Button>
  );
}

export default SchemaButton;
