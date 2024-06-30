import { useCallback, useEffect, useState, useRef } from "react";

import { getOptions, LIMIT } from "./api";

const createKeyHandler = (handlers) => (event) => {
  const handler = handlers?.[event.code];

  if (handler) {
    handler();
  }
};

export const useSelect = (onChange) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [page, setPage] = useState(0);

  const selectRef = useRef(null);
  const optionsRef = useRef(null);

  const loadOptions = useCallback(async () => {
    if (isNextPageLoading) return;

    setIsNextPageLoading(true);

    const response = await getOptions(page * LIMIT);
    const newOptions = options.concat(response.options);

    setOptions(newOptions);
    setHasNextPage(newOptions.length < response.count);
    setIsNextPageLoading(false);
    setPage((prev) => prev + 1);
  }, [isNextPageLoading, options, page]);

  const toggleSelect = useCallback(() => {
    if (!options.length) {
      loadOptions();
    }
    setIsOpen((prev) => !prev);
  }, [loadOptions, options.length]);

  const handleOptionClick = useCallback(
    (index) => {
      const option = options[index];
      setSelectedOption(option);

      if (onChange) {
        onChange(option);
      }

      setIsOpen(false);
    },
    [options, onChange]
  );

  const handleHighlightedIndexChange = useCallback(
    (index) => {
      optionsRef.current.scrollToItem(index);
      setHighlightedIndex(index);
    },
    [setHighlightedIndex]
  );

  const handleSelectKeyDown = useCallback(
    createKeyHandler({
      ArrowDown: () => {
        handleHighlightedIndexChange(
          Math.min(highlightedIndex + 1, options.length - 1)
        );
      },
      ArrowUp: () => {
        handleHighlightedIndexChange(Math.max(highlightedIndex - 1, 0));
      },
      Space: () => {
        if (!isOpen) {
          setIsOpen(true);
          return;
        }

        handleOptionClick(highlightedIndex);
      },
      Enter: () => handleOptionClick(highlightedIndex),
      Escape: () => setIsOpen(false),
    }),
    [
      handleOptionClick,
      setIsOpen,
      handleHighlightedIndexChange,
      highlightedIndex,
      options.length,
      isOpen,
    ]
  );

  const handleClickOutside = useCallback((event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, []);

  const handleKeyDown = useCallback((event) => {
    if (event.code === "Escape") {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClickOutside, handleKeyDown]);

  return {
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
  };
};
