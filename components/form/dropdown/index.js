import { useSelect } from 'downshift';
import PropTypes from 'prop-types';

Dropdown.propTypes = {
  items: PropTypes.array.isRequired,
  itemsAreObjects: PropTypes.bool,
  objectLabelProperty: PropTypes.string,
  onChangeFunction: PropTypes.func,
  selectLabel: PropTypes.string,
  hideLabel: PropTypes.bool,
  labelValue: PropTypes.string,
  labelClasses: PropTypes.string,
  selectContainerClasses: PropTypes.string,
  triggerClasses: PropTypes.string,
  ulClasses: PropTypes.string,
  liClasses: PropTypes.string,
  highlightColor: PropTypes.string,
};

// Default Values set here
Dropdown.defaultProps = {
  selectLabel: 'Choose an item',
  objectLabelProperty: 'name',
  onChangeFunction: null,
  hideLabel: false,
  labelClasses: '',
  selectContainerClasses: '',
  triggerClasses: '',
  ulClasses: '',
  liClasses: '',
  highlightColor: '#bde4ff',
  required: false,
};

/**
 * Wrapper around a simple downshift dropwdown select box
 * @param {array} items REQUIRED - array of items
 * @param {boolean} [itemsAreObjects=false] is "items" an array of objects. default=false
 * @param {string} [objectLabelProperty="name"] if the array items are objects, what is the property that should be accessed for the label. default="name"
 * @param {function} onChangeFunction the function to run on change
 * @param {string} [selectLabel="Choose an item"] the default label for the select box default="Choose an item"
 * @param {string} labelValue The string inside the label element. if there is no labelValue, the label will not be output.
 * @param {string} hideLabel This will add a screen reader only class to the label
 * @param {*} initialSelectedItem The initial selected item, this should be one an index of the items
 * @param {string} labelClasses A string of label classes to be appended onto the default classes
 * @param {string} selectContainerClasses A string of classes to be added to the selectContainer
 * @param {string} triggerClasses string of classes to go on the button
 * @param {string} ulClasses string of classes to go on dropdown ul
 * @param {string} liClasses string of classes to go on the list items
 * @param {string} highlightColor the hex value of the highlighted background for an li
 * @param {boolean} isFormikField is this part of a formik field?
 * @param {object} formikField
 * @param {object} formikForm
 * @param {boolean} required is the field required
 */
export default function Dropdown(props) {
  // Assigns props to p so we can set default values, shorten the code and make sure we know properties are from props
  const { ...p } = props;

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: p.items,
    itemToString: (item) => (item ? item[p.objectLabelProperty] : ''),
    onSelectedItemChange: p.onChangeFunction,
    initialSelectedItem: p.initialSelectedItem,
  });

  let selectContainerClasses = `relative ${p.selectContainerClasses}`,
    triggerClasses = `field-input overflow-hidden text-left ${p.triggerClasses}`,
    labelClasses = `field-label leading-none mb-2 ${p.required ? 'required' : null} ${
      p.hideLabel ? 'sr-only' : null
    } ${p.labelClasses}`,
    ulClasses = `absolute mt-1 w-full rounded-md bg-white border border-gray-400 z-10 outline-none overflow-hidden ${p.ulClasses}`,
    liClasses = `p-1 px-3 cursor-pointer ${p.liClasses}`;

  return (
    <>
      {p.labelValue ? (
        /* eslint-disable-next-line jsx-a11y/label-has-associated-control */
        <label className={labelClasses} {...getLabelProps()}>
          {p.labelValue}
        </label>
      ) : null}

      <div className={selectContainerClasses}>
        <button className={triggerClasses} {...getToggleButtonProps()}>
          <div>
            {p.itemsAreObjects
              ? (selectedItem && selectedItem[p.objectLabelProperty]) || p.selectLabel
              : selectedItem || p.selectLabel}
          </div>

          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        <ul {...getMenuProps()}>
          {isOpen && (
            <div className={ulClasses}>
              {p.items.map((item, index) => (
                <li
                  className={liClasses}
                  style={
                    highlightedIndex === index ? { backgroundColor: p.highlightColor } : {}
                  }
                  key={`${p.itemsAreObjects ? item[p.objectLabelProperty] : item}${index}`}
                  {...getItemProps({ item, index })}
                >
                  {p.itemsAreObjects ? item[p.objectLabelProperty] : item}
                </li>
              ))}
            </div>
          )}
        </ul>
      </div>
    </>
  );
}
