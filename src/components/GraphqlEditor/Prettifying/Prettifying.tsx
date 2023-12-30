import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { useSelector, useDispatch } from 'react-redux';
import { selectRequestValue, changeRequestValue } from '@/redux/slices/graphqlSlice';
import { IGlobalMessage } from '@/types/Message';
import { setMessage } from '@/redux/slices/globalMessageSlice';

import { prettifying } from './PrettifyingRules';
import { useLocalizationContext } from '@/providers/LocalizationProvider';

function Prettifying() {
  const { t } = useLocalizationContext();
  const dispatch = useDispatch();
  const query = useSelector(selectRequestValue);

  const hanldePrettifying = () => {
    if (query.includes(';') || query.includes('-') || query.includes('@') || query.includes("'")) {
      const wrongSymbolMessage: IGlobalMessage = {
        type: 'error',
        text: t.globalMessage.error.prettifying,
        isShown: true,
      };

      dispatch(setMessage(wrongSymbolMessage));
    } else {
      dispatch(changeRequestValue(prettifying(query)));
    }
  };

  return (
    <span
      onClick={() => hanldePrettifying()}
      title="Prettify"
      aria-hidden
      className="cursor-pointer opacity-90 transition-colors duration-300 
                 hover:text-editor-accent-light hover:opacity-100"
    >
      <PuzzlePieceIcon className="w-7 h-7" />
    </span>
  );
}

export default Prettifying;
