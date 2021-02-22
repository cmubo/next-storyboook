import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Dropdown from '.';

const books = [
  { label: 'Harry Potter' },
  { label: 'Net Moves' },
  { label: 'Half of a yellow sun' },
  { label: 'The Da Vinci Code' },
  { label: 'Born a crime' },
];
const labelValue = 'choose:';

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

const mockSelection = jest.fn();

describe('Validation Field', () => {
  it('renders with object', () => {
    render(
      <Dropdown
        items={books}
        itemsAreObjects={true}
        objectLabelProperty="label"
        label={labelValue}
      />
    );

    expect(screen.getByRole('button')).toBeInTheDocument(); // Button for dropdown exists
    expect(screen.getByText(labelValue)).toBeInTheDocument(); // Label exists
    expect(screen.getByRole('listbox')).toBeInTheDocument(); // list of options exists
  });

  it('selects items correctly', async () => {
    const { container } = render(
      <Dropdown
        items={books}
        itemsAreObjects={true}
        objectLabelProperty="label"
        label={labelValue}
        onChangeFunction={mockSelection}
      />
    );

    const button = screen.getByRole('button');

    // Open the dropdown
    await fireEvent.click(button);

    // There are options
    const listItem = container.querySelector('#downshift-1-item-0');
    expect(listItem).toBeInTheDocument();

    // Select a dropdown item
    await fireEvent.click(listItem);

    // The on change function was called
    expect(mockSelection).toHaveBeenCalled();

    // Has the expected arguments passed to the on change function from downshift
    const expectedArgument = {
      highlightedIndex: -1,
      inputValue: '',
      isOpen: false,
      selectedItem: { label: 'Harry Potter' },
      type: '__item_click__',
    };
    expect(mockSelection).toHaveBeenLastCalledWith(expectedArgument);
  });
});
