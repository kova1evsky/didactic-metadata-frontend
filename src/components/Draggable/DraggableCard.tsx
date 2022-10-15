import { FC } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import styled from 'styled-components';

export interface DraggableCardProps {
  renderCard: (entity: unknown) => JSX.Element;
  card: unknown;
  provided: DraggableProvided;
  isDragging: boolean;
}

export const DraggableCard: FC<DraggableCardProps> = ({
  card,
  renderCard,
  isDragging,
  provided,
}) => {
  return (
    <Container
      isDragging={isDragging}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {renderCard(card)}
    </Container>
  );
};

export default DraggableCard;

const Container = styled.div<{ isDragging?: boolean }>`
  background-color: ${({ isDragging }) => (isDragging ? '#eee' : 'none')};
  box-shadow: ${({ isDragging }) =>
    isDragging ? `2px 2px 1px green` : 'none'};
`;
