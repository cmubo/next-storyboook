import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

Accordion.propTypes = {
  allowMultiple: PropTypes.bool,
  beforePanelOpen: PropTypes.func,
  afterPanelOpen: PropTypes.func,
};

// Default Values set here
Accordion.defaultProps = {
  allowMultiple: true,
};

AccordionItem.propTypes = {
  containerProps: PropTypes.object.isRequired,
  itemId: PropTypes.string.isRequired,
  startOpen: PropTypes.bool,
};

/**
 * Toggles the accordion panel
 * @param {node} panelNode the node for the panel that is opened/closed
 * @param {boolean} openPanel should we open the panel, true of false.
 * All Arguments destructured from object.
 */
function _openAccordionPanel({ panelNode, openPanel }) {
  let panel = panelNode;
  let pClasses = panel.classList,
    activeClass = 'accordion__panel--active';

  if (openPanel) {
    _openPanel(panel);

    if (!pClasses.contains(activeClass)) pClasses.add(activeClass);
  } else {
    _closePanel(panel);

    if (pClasses.contains(activeClass)) pClasses.remove(activeClass);
  }
}

/**
 * Toggles the accordion tab
 * @param {node} toggleNode
 * @param {boolean} openPanel
 * All Arguments destructured from object.
 */
function _toggleAccordionTab({ toggleNode, openPanel, setOpenStatus }) {
  let tClasses = toggleNode.classList,
    activeClass = 'accordion__tab--active';
  if (openPanel) {
    setOpenStatus(true);
    if (!tClasses.contains(activeClass)) tClasses.add(activeClass);
  } else {
    setOpenStatus(false);
    if (tClasses.contains(activeClass)) tClasses.remove(activeClass);
  }
}

/**
 * @param {node} panel The panel which is opening
 */
function _openPanel(panel) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      panel.style.height = panel.scrollHeight + 'px';
    });
  });
}

/**
 * @param {node} panel The panel which is opening
 */
function _closePanel(panel) {
  requestAnimationFrame(() => {
    panel.style.height = `${panel.scrollHeight}px`;

    requestAnimationFrame(() => {
      panel.style.height = 0;
    });
  });
}

/**
 * @param {ref} panel the ref of the panel listeners are being attached to.
 */
function _attachEventListenersToPanel(panel) {
  panel = panel.current;
  panel.addEventListener('webkitTransitionEnd', _handleTransitionEnd);
  panel.addEventListener('transitionend', _handleTransitionEnd);
}

/**
 * Handle transitionend
 * @param {object} e = event
 */
function _handleTransitionEnd(e) {
  if (e.propertyName !== 'height') return;

  const panel = e.currentTarget;
  const height = parseInt(panel.style.height);

  if (height > 0) {
    panel.style.height = 'auto';
  }
}

/**
 *
 * @param {function} beforePanelOpen function runs before the panel is opened, passed in the args & event, should return a boolean to confirm whether we should continue or not.
 * @param {function} afterPanelOpen function runs after the panel is opened, passed in the args & event
 * @param {boolean} allowMultiple DEFAULT: true - If set to true, accordion will allow multiple panels to be open
 */
function Accordion(props) {
  const currentItem = useRef();

  const setCurrentItem = function (args) {
    currentItem.current = args;
  };

  const onToggle = (args, event) => {
    let shouldContinue = true;
    if (props.beforePanelOpen && typeof props.beforePanelOpen === 'function') {
      shouldContinue = props.beforePanelOpen(args, event);
    }

    if (!shouldContinue) return;

    /*
      If we are not allowing multiple items open, check if the last item is the same as this current item,
      if it isn't and that last item was opened. force close the last item.
    */
    if (
      currentItem.current &&
      !props.allowMultiple &&
      currentItem.current.itemId !== args.itemId &&
      currentItem.current.openPanel
    ) {
      currentItem.current.openPanel = false;
      currentItem.current.setOpenStatus(false);
      _openAccordionPanel(currentItem.current);
      _toggleAccordionTab(currentItem.current);
    }

    _openAccordionPanel(args);
    _toggleAccordionTab(args);

    if (props.afterPanelOpen && typeof props.afterPanelOpen === 'function') {
      props.afterPanelOpen(args, event);
    }

    setCurrentItem(args);
  };

  // Items passed into children function to be accessed by any children.
  const renderProps = {
    onToggle,
  };

  return (
    <>
      <div className="accordion">{props.children(renderProps)}</div>
    </>
  );
}

/**
 * @param {*} props contains object of props
 * @param {object} containerProps props passed in by accordion container
 * @param {string} itemId REQUIRED - should be a unique id: `panel + index`
 * @param {boolean} startOpen If set to true, on ititial render, the item will be open.
 */
function AccordionItem(props) {
  const [openStatus, setOpenStatus] = useState(false);
  const itemRef = useRef();
  const toggleRef = useRef();
  const panelRef = useRef();

  // Initially open if set to.
  useEffect(() => {
    if (props.startOpen) {
      togglePanel();

      // Starts without any transition classes if its meant to start open. After .3s it adds the transitions class
      setTimeout(() => {
        panelRef.current.classList.add('accordion__transitions');
      }, 300);
    }

    _attachEventListenersToPanel(panelRef);
  }, []);

  // TODO: This might be better as a useCallback
  const togglePanel = (event) => {
    // Runs the Accordion onToggle function
    props.containerProps.onToggle(
      {
        itemId: props.itemId,
        itemNode: itemRef.current,
        panelNode: panelRef.current,
        toggleNode: toggleRef.current,
        openPanel: !openStatus,
        setOpenStatus,
      },
      event
    );
  };

  const renderProps = {
    openStatus,
    itemId: props.itemId,
    itemRef: itemRef,
    toggleRef,
    panelRef,
    togglePanel,
    startOpen: props.startOpen,
  };

  return (
    <div className="accordion__item transition-all" ref={itemRef}>
      {props.children(renderProps)}
    </div>
  );
}

export { Accordion, AccordionItem };
