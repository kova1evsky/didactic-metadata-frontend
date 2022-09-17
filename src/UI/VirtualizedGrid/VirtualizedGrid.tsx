import React, { useEffect, useState } from 'react';
import { CellMeasurerCache, Index, InfiniteLoader } from 'react-virtualized';
import styled from 'styled-components';

import EntityCardsGrid from '@/UI/VirtualizedGrid/components/EntityCardsGrid';

export interface VirtualizedGridProps {
  entities: any[];
  renderCard: (entity: any) => JSX.Element;
  loadMoreEntities?: () => any;
  columnCount?: number;
  columnGap?: string;
  rowGap?: string;
  width?: string;
  height?: string;
}

const VirtualizedGrid = (props: VirtualizedGridProps) => {
  const {
    entities,
    renderCard,
    loadMoreEntities = () => [],
    columnCount = 1,
    rowGap = '1rem',
    columnGap = '1rem',
    height = '100vh',
    width = '100hh',
  } = props;

  const [cellsCache, _] = useState<CellMeasurerCache>(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 30,
    }),
  );

  const [rowCount, setRowCount] = useState<number>(
    Math.ceil(entities.length / columnCount) + 1,
  );

  useEffect(() => {
    setRowCount(Math.ceil(entities.length / columnCount));
  }, [entities, columnCount]);

  const isRowLoaded = ({ index }: Index) => {
    return index < rowCount - 1;
  };

  return (
    <Wrapper height={height} width={width}>
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreEntities}
        rowCount={rowCount}
        threshold={1}
      >
        {({ onRowsRendered, registerChild }) => (
          <EntityCardsGrid
            entities={entities}
            renderCard={renderCard}
            registerChild={registerChild}
            cellsCache={cellsCache}
            columnCount={columnCount}
            rowGap={rowGap}
            columnGap={columnGap}
            rowCount={rowCount}
            onSectionRendered={({ rowStartIndex, rowStopIndex }) =>
              onRowsRendered({
                startIndex: rowStartIndex,
                stopIndex: rowStopIndex,
              })
            }
          />
        )}
      </InfiniteLoader>
    </Wrapper>
  );
};

export default VirtualizedGrid;

const Wrapper = styled.div<{
  height: string;
  width: string;
}>`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
`;
