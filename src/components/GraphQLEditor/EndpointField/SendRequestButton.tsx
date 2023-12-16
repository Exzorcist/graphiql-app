import { PlayIcon } from '@heroicons/react/24/outline';
import Button from '@/components/Button';
import { useBreakpoint } from '@/hooks/breakpoints-hooks';

function SendRequestButton() {
  const isMobileL = useBreakpoint('min-mobile-lg');

  return (
    <Button type="submit" variant="solid" className="px-5 rounded-none rounded-r">
      {isMobileL ? 'Send Request' : <PlayIcon className="w-6 h-6" />}
    </Button>
  );
}

export default SendRequestButton;
