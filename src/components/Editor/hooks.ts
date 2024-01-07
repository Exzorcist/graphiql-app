import { useContext } from 'react';
import { EditorContext } from './Editor';
import { EditorContainerContext } from './EditorContainer';

export const useEditorContext = () => {
  const value = useContext(EditorContext);

  if (value === null) {
    throw new Error('useEditorContext must be used inside EditorContext');
  }

  return value;
};

export const useEditorContainerContext = () => {
  return useContext(EditorContainerContext);
};
