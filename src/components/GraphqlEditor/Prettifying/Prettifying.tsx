import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
import {
  selectRequestValue,
  changeRequestValue,
  selectHasRequestEditorLintErrors,
} from '@/redux/slices/graphqlSlice';
import { IGlobalMessage } from '@/types/Message';
import { setMessage } from '@/redux/slices/globalMessageSlice';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux-hooks';
import { prettifying } from '@/components/GraphqlEditor/Prettifying/PrettifyingRules';
import { useLocalizationContext } from '@/providers/LocalizationProvider';

function Prettifying() {
  const { t } = useLocalizationContext();
  const dispatch = useAppDispatch();
  const query = useAppSelector(selectRequestValue);
  const hasLintErrors = useAppSelector(selectHasRequestEditorLintErrors);

  const hanldePrettifying = () => {
    if (hasLintErrors) {
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
      onClick={hanldePrettifying}
      title="Prettify"
      aria-hidden
      className="cursor-pointer opacity-90 transition-colors duration-300 hover:text-editor-accent-light hover:opacity-100"
    >
      <PuzzlePieceIcon className="w-7 h-7" />
    </span>
  );
}

export default Prettifying;
