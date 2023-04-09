import { Draggable } from "react-beautiful-dnd";
import { STATUS, TodoType } from "../type/TodoType";

function CardItem({
  item,
  index,
  onEdit,
}: {
  item: TodoType;
  index: number;
  onEdit: Function;
}) {
  return (
    <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className="card-item border border-gray-200 mt-2 p-2 bg-white rounded-lg"
            onClick={() => onEdit(item)}
            id={`${item.id}`}
          >
            <p>Id: {item.id}</p>
            <h3>Title: {item.title}</h3>
            <p>Description: {item.description}</p>
            <p>Status: {STATUS[item.status]}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default CardItem;
