import { render, screen } from '@testing-library/react';
import Button from '@/components/ui/Button';
import { user } from '@/__tests__/test-utils';

describe('Button', () => {
  it('works as button', async () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>foo</Button>);

    const button = screen.getByText('foo');

    expect(button).toBeInTheDocument();
    expect(button).toMatchInlineSnapshot(`
    <button
      class="py-[5px] px-2 transition rounded min-w-fit cursor-pointer hover:bg-editor-secondary hover:text-editor-accent"
      role="button"
      tabindex="0"
      type="button"
    >
      foo
    </button>
  `);

    await user.click(button);

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('can be rendered as different tag', async () => {
    render(
      <Button as="a" href="/bar">
        foo
      </Button>
    );

    const button = screen.getByText('foo');

    expect(button).toMatchInlineSnapshot(`
      <a
        class="py-[5px] px-2 transition rounded min-w-fit cursor-pointer hover:bg-editor-secondary hover:text-editor-accent"
        href="/bar"
        role="button"
        tabindex="0"
        type="button"
      >
        foo
      </a>
    `);
  });
});
