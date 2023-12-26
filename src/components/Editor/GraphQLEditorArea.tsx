import { ReactCodeMirrorRef, ViewUpdate } from '@uiw/react-codemirror';
import { graphql, updateSchema } from 'cm6-graphql';
import { useCallback, useEffect, useRef, useState } from 'react';
import { selectGraphQLSchema } from '@/redux/slices/graphqlSlice';
import { useAppSelector } from '@/utils/hooks/redux-hooks';
import EditorArea, { EditorAreaProps } from './EditorArea';

function GraphQLEditorArea({ onChange, ...props }: EditorAreaProps) {
  const editorAreaRef = useRef<ReactCodeMirrorRef | null>(null);
  const graphqlSchema = useAppSelector(selectGraphQLSchema);
  const [editorValue, setEditorValue] = useState('');
  const langExtension = useRef([graphql(editorValue === '' ? undefined : graphqlSchema)]);

  useEffect(() => {
    if (editorAreaRef.current?.view) {
      updateSchema(editorAreaRef.current.view, editorValue === '' ? undefined : graphqlSchema);
    }
  }, [editorValue, editorAreaRef.current?.view, graphqlSchema]);

  const handleChange = useCallback(
    (value: string, viewUpdate: ViewUpdate) => {
      setEditorValue(value);
      onChange?.(value, viewUpdate);
    },
    [onChange]
  );

  return (
    <EditorArea
      onChange={handleChange}
      ref={editorAreaRef}
      extensions={langExtension.current}
      {...props}
    />
  );
}

export default GraphQLEditorArea;
