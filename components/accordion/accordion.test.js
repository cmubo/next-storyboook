import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import { Accordion, AccordionItem } from './index';

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

const beforePanelOpenMock = jest.fn();
const afterPanelOpenMock = jest.fn();

function AccordionTest() {
  return (
    <Accordion
      allowMultiple={false}
      beforePanelOpen={() => {
        beforePanelOpenMock();
        return true;
      }}
      afterPanelOpen={() => {
        afterPanelOpenMock();
      }}
    >
      {({ onToggle }) => (
        <AccordionItem
          containerProps={{ onToggle }}
          tabTitle="Software Name"
          itemId="panel1"
          key="item-1"
        >
          {({ openStatus, itemId, panelRef, toggleRef, togglePanel }) => (
            <>
              <dt>
                <span data-testid="tabTitle">Accordion title</span>
                <div>
                  <button
                    aria-expanded={openStatus}
                    aria-controls={itemId}
                    aria-disabled={openStatus}
                    id={`${itemId}trigger`}
                    ref={toggleRef}
                    onClick={(event) => togglePanel(event)}
                    data-testid="accordionTrigger"
                  >
                    {openStatus ? 'Close' : 'Edit'}
                  </button>
                </div>
              </dt>
              <dd
                id={itemId}
                role="region"
                aria-labelledby={`${itemId}trigger`}
                ref={panelRef}
              >
                <div data-testid="panelContent">Panel content</div>
              </dd>
            </>
          )}
        </AccordionItem>
      )}
    </Accordion>
  );
}

describe('Accordion', () => {
  it('renders without crashing', async () => {
    render(<AccordionTest />);

    const tabTitle = screen.getByTestId('tabTitle');
    const accordionTrigger = screen.getByTestId('accordionTrigger');
    const panelContent = screen.getByTestId('panelContent');

    await screen.findByText('Accordion title');
    await screen.findByText('Edit');
    await screen.findByText('Panel content');

    expect(tabTitle).toBeInTheDocument();
    expect(accordionTrigger).toBeInTheDocument();
    expect(panelContent).toBeInTheDocument();
  });

  it('On click runs', async () => {
    act(() => {
      render(<AccordionTest />);
    });

    const accordionTrigger = screen.getByTestId('accordionTrigger');

    await fireEvent.click(accordionTrigger);

    expect(beforePanelOpenMock).toHaveBeenCalled();
    expect(afterPanelOpenMock).toHaveBeenCalled();
  });
});
