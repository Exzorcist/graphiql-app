import { PlayIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { useLocalizationContext } from '@/providers/LocalizationProvider';

function SendRequestButton() {
  const { t } = useLocalizationContext();
  const isMobileL = useBreakpoint('min-mobile-lg');

  return (
    <Button type="submit" variant="solid" className="px-5 rounded-none rounded-r">
      {isMobileL ? t.page.editor['Send Request'] : <PlayIcon className="w-6 h-6" />}
    </Button>
  );
}

export default SendRequestButton;
