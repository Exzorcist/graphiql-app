import GraphqlEditor from '@/components/GraphqlEditor/GraphqlEditor';
import { customRender as render } from '../test-utils';

test('GraphqlEditor', () => {
  render(<GraphqlEditor />);

  expect(document.body).toMatchSnapshot();
});
