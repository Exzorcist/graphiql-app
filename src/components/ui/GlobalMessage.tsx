import { CheckBadgeIcon, NoSymbolIcon, MegaphoneIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMessage, hideMessage } from '@/redux/reducers/GlobalMessageSlice';
import { cn } from '@/utils/cn';

function GlobalMessage() {
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();
  const delay = 3000;

  useEffect(() => {
    if (message.isShown) {
      setTimeout(() => {
        dispatch(hideMessage());
      }, delay);
    }
  }, [message.isShown, dispatch]);

  return (
    <div
      data-element="global-message"
      className={cn(
        `fixed bottom-3 right-3 z-30 py-2 pr-5 pl-14 rounded-xl text-lg max-w-[280px] md:max-w-sm lg:max-w-lg
         transition-transform duration-500 delay-500 translate-x-96 border`,
        message.isShown && 'translate-x-0',
        message.type === 'info' && 'bg-blue-100 text-blue-700 border-blue-700',
        message.type === 'success' && 'bg-green-100 text-green-700 border-green-700',
        message.type === 'error' && 'bg-red-100 text-red-700 border-red-700'
      )}
    >
      {message.type === 'error' && <NoSymbolIcon className="w-6 h-6 absolute top-2.5 left-5" />}
      {message.type === 'info' && <MegaphoneIcon className="w-6 h-6 absolute top-2.5 left-5" />}
      {message.type === 'success' && <CheckBadgeIcon className="w-6 h-6 absolute top-2.5 left-5" />}
      {message.text}
    </div>
  );
}

export default GlobalMessage;
