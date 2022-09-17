import React from 'react';
import { CellMeasurer, CellMeasurerProps } from 'react-virtualized';
import styled from 'styled-components';

export interface CellRendererProps {
  renderEntity: any;
  renderCard: (entity: any) => JSX.Element;
  cellMeasurerProps: Omit<CellMeasurerProps, 'children'>;
  rowGap: string;
  columnGap: string;
  columnCount: number;
}

const CellRenderer = ({
  renderEntity,
  renderCard,
  rowGap,
  columnGap,
  columnCount,
  cellMeasurerProps,
}: CellRendererProps) => {
  const { cache, parent, style, columnIndex, rowIndex, key } =
    cellMeasurerProps;

  return (
    <CellMeasurer
      key={key}
      cache={cache}
      parent={parent}
      columnIndex={columnIndex}
      rowIndex={rowIndex}
    >
      <CellWrapper
        style={style}
        rowGap={rowGap}
        columnGap={columnGap}
        columnCount={columnCount}
      >
        {renderCard(renderEntity)}
      </CellWrapper>
    </CellMeasurer>
  );
};

export default CellRenderer;

const CellWrapper = styled.div<{
  columnCount: number;
  rowGap: string;
  columnGap: string;
}>`
  display: flex;
  padding-right: ${({ columnGap }) => columnGap};
  padding-bottom: ${({ rowGap }) => rowGap};

  :nth-child(${({ columnCount }) => columnCount}n) {
    padding-right: 0;
  }
`;
