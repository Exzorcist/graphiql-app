import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
import {
  selectRequestValue,
  changeRequestValue,
  selectHasRequestEditorLintErrors,
} from '@/redux/slices/graphql/graphqlSlice';
import { IGlobalMessage } from '@/types/Message';
import { setMessage } from '@/redux/slices/globalMessageSlice';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux-hooks';
import { prettifying } from '@/components/GraphqlEditor/Prettifying/PrettifyingRules';
import { useLocalizationContext } from '@/providers/LocalizationProvider';
import Button from '@/components/ui/Button';
import { PropsWithClassName } from '@/types/PropsWithClassName';

function Prettifying({ className }: PropsWithClassName) {
  const hasLintErrors = useAppSelector(selectHasRequestEditorLintErrors);
  const query = useAppSelector(selectRequestValue);
  const { t } = useLocalizationContext();
  const dispatch = useAppDispatch();

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
    <Button onClick={hanldePrettifying} title="Prettify" className={className}>
      <div className="flex items-center gap-2">
        <span className="hidden sm:inline">{t.page.editor.prettify}</span>
        <PuzzlePieceIcon className="w-7 h-7" />
      </div>
    </Button>
  );
}

export default Prettifying;
