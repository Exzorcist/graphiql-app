import { screen } from '@testing-library/react';
import { user, customRender as render } from '@/__tests__/test-utils';
import { Editor } from '@/components/Editor';

vi.spyOn(document, 'createRange').mockReturnValue({
  ...document.createRange(),
  setEnd: vi.fn(),
  setStart: vi.fn(),
  getClientRects: vi.fn(() => ({
    item: vi.fn(),
    length: 0,
    left: 0,
    right: 0,
  })),
});

describe('Editor', () => {
  it('displays typed text', async () => {
    render(<Editor />);

    expect(screen.getByTestId('editor-area')).toBeInTheDocument();

    const editorContent = document.querySelector('.cm-content')!;
    await user.click(editorContent);
    await user.keyboard('foo');

    expect(screen.getByText('foo')).toBeVisible();
  });

  it('renders header correctly', () => {
    render(
      <Editor>
        <Editor.Container>
          <Editor.Header>
            <div>Header</div>
          </Editor.Header>
          <Editor.Area />
        </Editor.Container>
      </Editor>
    );

    const editorHeader = screen.getByText('Header');
    expect(editorHeader).toBeVisible();

    const { height } = window.getComputedStyle(editorHeader);
    expect(screen.getByTestId('editor-area')).toHaveStyle({ paddingTop: height });
  });
});
