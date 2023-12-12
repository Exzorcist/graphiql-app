import Button from '../Button';

function EndpointField() {
  return (
    <form className="h-[45px] flex w-full bg-editor-secondary border-editor-border border rounded">
      <input className="w-full h-full bg-transparent outline-none pl-4" />
      <Button className="bg-[#83D554] min-w-fit px-5 rounded-r">Send Request</Button>
    </form>
  );
}

export default EndpointField;
