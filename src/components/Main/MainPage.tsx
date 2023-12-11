import CodeMirror from '@uiw/react-codemirror';

function MainPage() {
  return (
    <>
      <h1 className="block text-xl text-red-600">Empty base page</h1>
      <div className="absolute bottom-40 left-20 right-20 top-20 text-left">
        <CodeMirror
          value="Test code mirror text"
          onChange={() => {
            // editor, data - these are function parameters
            // console.log(editor, data);
          }}
        />
      </div>
    </>
  );
}
export default MainPage;
