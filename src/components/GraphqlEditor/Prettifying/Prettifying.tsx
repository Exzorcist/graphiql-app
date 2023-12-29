import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { useSelector, useDispatch } from 'react-redux';
import { selectRequestValue, changeRequestValue } from '@/redux/slices/graphqlSlice';

// import { setLines, combineRows, getRows, trimSpaces, setTabs } from './PrettifyingRules';
import { setLines, combineRows, getRows, trimSpaces } from './PrettifyingRules';

function Prettifying() {
  const dispatch = useDispatch();
  const query = useSelector(selectRequestValue);

  const hanldePrettifying = () => {
    let newQuery: string | string[] = '';
    // console.group();
    // console.log('Before:');
    // console.log(query);
    // console.groupEnd();

    // console.group();
    // console.log('========================================');
    // console.log('After:');

    newQuery = trimSpaces(query);
    newQuery = getRows(newQuery);
    newQuery = (newQuery as string[]).map((str) => setLines(str));
    // newQuery = () => {
    //     (newQuery as string[]).map((str) => setTabs(str));
    // }();
    newQuery = combineRows(newQuery);

    // console.log(newQuery);
    // console.groupEnd();

    dispatch(changeRequestValue(newQuery));
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
