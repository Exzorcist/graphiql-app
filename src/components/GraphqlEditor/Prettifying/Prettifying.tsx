import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { useSelector, useDispatch } from 'react-redux';
import { selectRequestValue, changeRequestValue } from '@/redux/slices/graphqlSlice';
import { IGlobalMessage } from '@/types/Message';
import { setMessage } from '@/redux/slices/globalMessageSlice';

import {
  combineRows,
  getRows,
  trimSpaces,
  arrayStringMutation,
  setLineBreak,
  setFieldLine,
  removeDuplicatedSpaces,
  removeBraketSpace,
  addExtraBraketSpace,
  addExtraArgumentSpace,
  correctComma,
  setPadding,
} from './PrettifyingRules';
import { useLocalizationContext } from '@/providers/LocalizationProvider';

function Prettifying() {
  const { t } = useLocalizationContext();
  const dispatch = useDispatch();
  const query = useSelector(selectRequestValue);

  const hanldePrettifying = () => {
    let newQuery: string | string[] = '';

    if (query.includes(';') || query.includes('-') || query.includes('@')) {
      const wrongSymbolMessage: IGlobalMessage = {
        type: 'error',
        text: t.globalMessage.error.prettifying,
        isShown: true,
      };

      dispatch(setMessage(wrongSymbolMessage));
    } else {
      // console.group();
      // console.log(query);
      // console.groupEnd();

      // console.group();
      newQuery = trimSpaces(query);
      newQuery = getRows(newQuery);

      if (Array.isArray(newQuery)) {
        newQuery = arrayStringMutation(newQuery, trimSpaces);
        newQuery = arrayStringMutation(newQuery, removeDuplicatedSpaces);
        newQuery = arrayStringMutation(newQuery, removeBraketSpace);
        newQuery = arrayStringMutation(newQuery, addExtraBraketSpace);
        newQuery = arrayStringMutation(newQuery, addExtraArgumentSpace);
        newQuery = arrayStringMutation(newQuery, correctComma);
        newQuery = setFieldLine(newQuery);
        newQuery = setPadding(newQuery);
        newQuery = arrayStringMutation(newQuery, setLineBreak);
      }

      newQuery = combineRows(newQuery);

      // console.log(newQuery);
      // console.groupEnd();

      dispatch(changeRequestValue(newQuery));
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
