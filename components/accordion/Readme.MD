# Accordion

The accordion component provides a way of creating accordions in react with full control over appearance via render props.

The accordion requires two components to work, the <Accordion></Accordion> Component, and the <AccordionItem></AccordionItem> component.


## Accordion Component
The accordion component is a wrapper around any accordion items, this holds the overall state of the accordion.

```
<Accordion>
  {({ onToggle }) =>

  }
</Accordion>
```

### arguments/props

| Prop Key | type | description |
| ----------- | ----------- | ----------- | 
| allowMultiple | boolean | Should the accordion allow multiple panels to be open at once. |
| beforePanelOpen | function | a function which will run on toggle but before the panel opens |
| afterPanelOpen | function | a function which will run on toggle but after the panel opens |


### Render props

| Render Prop | type | description |
| ----------- | ----------- | ----------- | 
| onToggle | function | A function reference for the onToggle handle, this controls opening and closing panels. This should be passed into the accordionItem `containerProps` prop. |

## AccordionItem Component
The accordionItem component is needed for each accordion item. This will pass down all the render props needed to open/close panels as well as controlling the height of those. This should be placed inside of the <Accordion> component as a child.

```
  <AccordionItem
    containerProps={{ onToggle }}
    itemId="panel_id"
    startOpen={false}
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

    }
  </AccordionItem>
```


### arguments/props

| Prop Key | type | description |
| ----------- | ----------- | ----------- | 
| containerProps | object | Required - These are the props that are required to be passed down from the parent <Accordion> component. |
| itemId | string | Required - This should be a unique Id for the panel, if inside a loop, use the index in combination with a string. |
| startOpen | boolean | Choose whether the panel should start open. if allow multiple is set, the last panel that has truthy value will be open. |


### Render props

| Render Prop | type | description |
| ----------- | ----------- | ----------- | 
| openStatus | boolean | The status of the panel, if openStatus is true, the panel is open. |
| itemId | string | The ID of the panel |
| itemRef | object | The ref of the panel |
| toggleRef | object | The ref hook for the toggle, this should be placed on the button which opens the panel. |
| togglePanel | function | This is the function call to open/close the panel. This calls the parent <Accordion> toggle function. This should be placed on an event handler of whatever toggles the panels to open/close. |
| startOpen | boolean | a boolean reference to whether the item starts open. |