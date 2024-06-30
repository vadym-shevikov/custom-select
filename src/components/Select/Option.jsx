import { forwardRef, useCallback } from "react";

import classes from "./Select.module.css";

export const Option = forwardRef((props, ref) => {
  const {
    index,
    style,
    isItemLoaded,
    option,
    selectedOption,
    highlightedIndex,
    handleOptionClick,
    handleHighlightedIndexChange,
  } = props;

  const click = useCallback(
    () => handleOptionClick(index),
    [handleOptionClick, index]
  );
  const mouseEnter = useCallback(
    () => handleHighlightedIndexChange(index),
    [handleHighlightedIndexChange, index]
  );

  if (!isItemLoaded(index)) {
    return (
      <div ref={ref} style={style} className={classes.loading}>
        Loading...
      </div>
    );
  }

  const optionClasses = `
    ${classes.option}
    ${highlightedIndex === index ? classes.active : ""}
    ${selectedOption?.id === option.id ? classes.selected : ""}
  `;

  return (
    <div
      ref={ref}
      style={style}
      className={optionClasses}
      onClick={click}
      onMouseEnter={mouseEnter}
      title={option.name}
    >
      {option.name}
    </div>
  );
});
