import React from 'react';

export interface CellRendererParams {
  columnIndex: number;
  isScrolling: boolean;
  isVisible: boolean;
  key: string;
  parent: Object;
  rowIndex: number;
  style: React.CSSProperties;
}
