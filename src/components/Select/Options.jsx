import React, { useCallback, forwardRef } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import { Option } from "./Option";

const LIST_HEIGHT = 160;
const ITEM_HEIGHT = LIST_HEIGHT / 4;

export const Options = forwardRef((props, ref) => {
  const {
    hasNextPage,
    isNextPageLoading,
    options,
    loadNextPage,
    ...optionProps
  } = props;

  const itemCount = hasNextPage ? options.length + 1 : options.length;
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  const isItemLoaded = useCallback(
    (index) => !hasNextPage || index < options.length,
    [hasNextPage, options.length]
  );

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered }) => (
        <List
          height={LIST_HEIGHT}
          itemCount={itemCount}
          itemSize={ITEM_HEIGHT}
          onItemsRendered={onItemsRendered}
          ref={ref}
        >
          {({ ref: optionRef, ...props }) => {
            return (
              <Option
                {...optionProps}
                {...props}
                ref={optionRef}
                option={options[props.index]}
                isItemLoaded={isItemLoaded}
              />
            );
          }}
        </List>
      )}
    </InfiniteLoader>
  );
});
