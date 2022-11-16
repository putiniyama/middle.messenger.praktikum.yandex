import { getByTestId, prettyDOM, getByText } from '@testing-library/dom'
import { Button } from '../../components';
import { renderBlock } from '../../tests/renderUtils';

describe('pages/Onbording', () => {
  it('should render button', () => {
    renderBlock({
      Block: Button,
      props: {text: 'Привет тесты', onClick: () => {}},
    });
    expect(getByText(document.body, 'Привет тесты')).toBeInTheDocument();
  });
});
