import classes from "./Select.module.css";

import { Options } from "./Options";
import { useSelect } from "./useSelect";

export const Select = ({ onChange } = {}) => {
  const {
    isOpen,
    highlightedIndex,
    selectedOption,
    hasNextPage,
    isNextPageLoading,
    options,
    selectRef,
    optionsRef,
    loadOptions,
    toggleSelect,
    handleOptionClick,
    handleHighlightedIndexChange,
    handleSelectKeyDown,
  } = useSelect(onChange);

  return (
    <>
      <div ref={selectRef} className={classes.wrapper}>
        <div
          className={`${classes.select} ${isOpen ? classes.open : ""}`}
          onKeyDown={handleSelectKeyDown}
          tabIndex={0}
        >
          <div className={classes.trigger} onClick={toggleSelect}>
            <span>{selectedOption?.name || "Select an option"}</span>
            <div className={classes.arrow}></div>
          </div>
          {(options.length || isOpen) && (
            <div className={classes.options}>
              <Options
                ref={optionsRef}
                hasNextPage={hasNextPage}
                isNextPageLoading={isNextPageLoading}
                options={options}
                loadNextPage={loadOptions}
                highlightedIndex={highlightedIndex}
                selectedOption={selectedOption}
                handleOptionClick={handleOptionClick}
                handleHighlightedIndexChange={handleHighlightedIndexChange}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
