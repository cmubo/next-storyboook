import Dropdown from '../components/form/dropdown';
import faker, { fake } from 'faker';
import range from 'lodash/range';

export default {
  title: 'Dropdown',
};

export const dropdown = (props) => {
  let itemsArray = range(props.itemCount).map(() => faker.name.firstName());

  return (
    <>
      <Dropdown
        items={itemsArray}
        itemsAreObjects={false}
        objectLabelProperty="label"
        {...props}
      />

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

dropdown.args = {
  itemCount: 3,
  labelValue: 'Label:',
  selectLabel: 'Choose an option',
  hideLabel: false,
  labelClasses: '',
  selectContainerClasses: '',
  triggerClasses: '',
  ulClasses: '',
  liClasses: '',
  highlightColor: '',
  required: true,
};

dropdown.argTypes = {
  itemCount: { control: { type: 'range', min: 0, max: 10 } },
  labelValue: {
    description:
      'The string inside the label element. if there is no labelValue, the label will not be output.',
  },
  selectLabel: {
    description: 'The default label for the select box.',
    defaultValue: { summary: 'Choose an item' },
    type: { name: 'string', required: false },
  },
  hideLabel: {
    description: 'This will add a screen reader only class to the label',
    defaultValue: { summary: false },
  },
  labelClasses: {
    description: 'A string of label classes to be appended onto the default classes',
    defaultValue: { summary: '' },
  },
  selectContainerClasses: {
    description: 'A string of classes to be added to the selectContainer',
    defaultValue: { summary: '' },
  },
  triggerClasses: {
    description: 'A string of classes to go on the button/toggle',
    defaultValue: { summary: '' },
  },
  ulClasses: {
    description: 'A string of classes to go on dropdown ul',
    defaultValue: { summary: '' },
  },
  liClasses: {
    description: 'A string of classes to go on the list items',
    defaultValue: { summary: '' },
  },
  highlightColor: {
    description: 'The hex value of the highlighted background for an li',
    defaultValue: { summary: '#bde4ff' },
    control: 'color',
  },
  required: {
    description: 'Is the field required',
    defaultValue: { summary: false },
  },
  // Required properties that controls wouldnt apply to
  items: {
    description:
      'This would be the array of items, in storybook this has been created via itemCount.',
    control: null,
    required: true,
  },
  itemsAreObjects: {
    description: 'Is the "items" prop an array of objects',
    defaultValue: { summary: false },
  },
  objectLabelProperty: {
    description:
      'If the array items are objects, what is the property that should be accessed for the label.',
    defaultValue: { summary: 'name' },
    control: null,
  },
  onChangeFunction: {
    description: 'The function to run on item change',
    defaultValue: { summary: null },
    control: null,
  },
};
