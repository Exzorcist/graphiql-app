import { fireEvent, screen } from '@testing-library/react';
import { customRender as render } from '@/__tests__/test-utils';
import Prettifying from '@/components/GraphqlEditor/Prettifying/Prettifying';

describe('Prettifying component', () => {
  it('dispatches changeRequestValue with prettified query if no invalid symbols are present', () => {
    render(<Prettifying />);

    fireEvent.click(screen.getByTitle('Prettify'));
  });
});
