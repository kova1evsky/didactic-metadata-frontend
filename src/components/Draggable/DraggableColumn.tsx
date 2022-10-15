import React, { FC, useCallback, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { COLUMNS } from '@/components/Draggable/data';
import DraggableList from '@/components/Draggable/DraggableList';

export interface DraggableColumnProps {
  renderCard: (entity: any) => JSX.Element;
  cards: any[];
}

export type Column = {
  id: string;
  name: string;
  items: any[];
};

const DraggableColumn: FC<DraggableColumnProps> = ({ cards, renderCard }) => {
  const [columns, setColumns] = useState(COLUMNS);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      console.log(result);
      const { destination, source } = result;
      if (!destination) return;

      if (source.droppableId !== destination.droppableId) {
        const [sourceColumn] = columns.filter(
          (col) => col.id === source.droppableId,
        );
        const [destinationColumn] = columns.filter(
          (col) => col.id === destination.droppableId,
        );

        const [dragged] = sourceColumn.items.splice(source.index, 1);

        destinationColumn.items.splice(destination.index, 0, dragged);

        columns.map((col) => {
          if (col.id === destinationColumn.id) {
            return destinationColumn;
          }
          if (col.id === sourceColumn.id) {
            return sourceColumn;
          }
          return col;
        });

        setColumns(columns);

        return;
      }

      const [column] = columns.filter((col) => col.id === source.droppableId);
      const [dragged] = column.items.splice(source.index, 1);

      column.items.splice(destination?.index, 0, dragged);
      columns.map((col) => (col.id !== source.droppableId ? col : column));

      setColumns(columns);
    },
    [columns],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {columns.map((column) => (
          <Droppable droppableId={column.id} key={column.id}>
            {(provided) => (
              <DropZone ref={provided.innerRef} {...provided.droppableProps}>
                <DraggableList
                  key={column.id}
                  renderCard={renderCard}
                  cards={column.items}
                />
                {provided.placeholder}
              </DropZone>
            )}
          </Droppable>
        ))}
      </Container>
    </DragDropContext>
  );
};

export default DraggableColumn;

const DropZone = styled.div`
  padding: 1rem;
  margin: 0 2rem;
  max-width: 30rem;
  min-width: 20rem;
  border: 2px solid gray;
`;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;
