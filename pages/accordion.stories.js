import { Accordion, AccordionItem } from '../components/accordion/';
import faker, { fake } from 'faker';
import range from 'lodash/range';

export default {
  title: 'Accordion',
};


export const accordion = (props) => {
  return (
    <Accordion allowMultiple={props.allowMultiple}>
      {({ onToggle }) =>
        range(props.itemCount).map((item, index) => (

          <AccordionItem
            containerProps={{ onToggle }}
            itemId={`panel${index}`}
            key={`item-${index}`}
            startOpen={true}
          >

            {({
              openStatus,
              itemId,
              itemRef,
              panelRef,
              toggleRef,
              togglePanel,
              startOpen,
            }) => (

              <>
                <dt
                  className="accordion__tab flex justify-between p-4 border-b border-gray-400"
                >
                  <span className="accordion__title">{faker.name.firstName()} {openStatus}</span>

                  <div className="flex">
                    <button
                      className="accordion__trigger text-c-navy underline text-sm"
                      aria-expanded={openStatus}
                      aria-controls={itemId}
                      aria-disabled={openStatus}
                      id={`${itemId}trigger`}
                      ref={toggleRef}
                      onClick={(event) => {
                        togglePanel(event);
                      }}
                    >
                      {openStatus ? 'Close' : 'Edit'}
                    </button>
                  </div>
                </dt>
                <dd
                  className={`accordion__panel ${
                    !startOpen ? 'accordion__transitions' : null
                  }`}
                  id={itemId}
                  role="region"
                  aria-labelledby={`${itemId}trigger`}
                  ref={panelRef}
                >
                  <div className="accordion__panel-inner border-b border-gray-400">
                    <div className="p-4">
                      {faker.lorem.paragraph(2)}
                    </div>
                  </div>
                </dd>
              </>
            )}
          </AccordionItem>
        ))
      }
    </Accordion>
  )
}

accordion.args = {
  allowMultiple: false,
  itemCount: 3
};

accordion.argTypes = {
  itemCount:  { control: { type: 'range', min: 0, max: 10 } }
};