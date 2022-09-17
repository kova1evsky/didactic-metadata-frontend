import { useState } from 'react';
import { AutoSizer, CellMeasurerCache, Grid, Size } from 'react-virtualized';
import { RenderedSection } from 'react-virtualized/dist/es/Grid';

import CellRenderer from '@/UI/VirtualizedGrid/components/CellRenderer';
import { CellRendererParams } from '@/UI/VirtualizedGrid/types';

export interface EntityCardsGridProps {
  entities: any[];
  renderCard: (entity: any) => JSX.Element;
  registerChild: any;
  cellsCache: CellMeasurerCache;
  onSectionRendered: (section: RenderedSection) => any;
  columnCount: number;
  rowCount: number;
  columnGap: string;
  rowGap: string;
}

const EntityCardsGrid = (props: EntityCardsGridProps) => {
  const [columnWidth, setColumnWidth] = useState(100);
  const {
    onSectionRendered,
    registerChild,
    rowCount,
    columnCount,
    cellsCache,
    entities,
    renderCard,
    columnGap,
    rowGap,
  } = props;

  const cellRenderer = (params: CellRendererParams) => {
    const { columnIndex, rowIndex } = params;
    const entity = entities[rowIndex * columnCount + columnIndex];

    return (
      entity && (
        <CellRenderer
          renderEntity={entity}
          renderCard={renderCard}
          rowGap={rowGap}
          columnGap={columnGap}
          columnCount={columnCount}
          cellMeasurerProps={{
            ...params,
            cache: cellsCache,
          }}
        />
      )
    );
  };

  const onResize = ({ width }: Size) => {
    setColumnWidth(width / columnCount);

    cellsCache.clearAll();
  };

  return (
    <AutoSizer onResize={onResize}>
      {({ height, width }) => (
        <Grid
          width={width}
          height={height}
          ref={registerChild}
          columnWidth={columnWidth}
          columnCount={columnCount}
          rowCount={rowCount}
          rowHeight={cellsCache.rowHeight}
          cellRenderer={cellRenderer}
          onSectionRendered={onSectionRendered}
        />
      )}
    </AutoSizer>
  );
};

export default EntityCardsGrid;
