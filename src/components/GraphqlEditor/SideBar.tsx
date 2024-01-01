import Prettifying from '@/components/GraphqlEditor/Prettifying/Prettifying';

function SideBar() {
  return (
    <aside className="w-[50px] flex flex-col items-center flex-shrink-0 h-full bg-editor-primary border-editor-border border-r py-4 px-2">
      <Prettifying />
    </aside>
  );
}

export default SideBar;
