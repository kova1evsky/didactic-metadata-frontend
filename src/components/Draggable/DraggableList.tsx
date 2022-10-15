import React, { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import DraggableCard from '@/components/Draggable/DraggableCard';

export interface DraggableListProps {
  renderCard: (entity: any) => JSX.Element;
  cards: any[];
}

const DraggableList: FC<DraggableListProps> = ({ cards, renderCard }) => {
  return (
    <React.Fragment>
      {cards.map((card, index) => (
        <Draggable key={card.id} draggableId={card.id} index={index}>
          {(dragProvided, dragSnapshot) => (
            <DraggableCard
              renderCard={renderCard}
              card={card}
              provided={dragProvided}
              isDragging={dragSnapshot.isDragging}
            />
          )}
        </Draggable>
      ))}
    </React.Fragment>
  );
};

export default DraggableList;
