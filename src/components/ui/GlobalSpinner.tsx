import { cn } from '@/utils/cn';
import Spinner, { SpinnerProps } from './Spinner';

type Props = SpinnerProps;

function GlobalSpinner({ className, svgClassName }: Props) {
  return (
    <div className={cn('absolute inset-0', className)}>
      <Spinner className="absolute-center" svgClassName={cn('w-10 h-10', svgClassName)} />
    </div>
  );
}

export default GlobalSpinner;
