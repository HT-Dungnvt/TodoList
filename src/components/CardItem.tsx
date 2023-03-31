import { STATUS, TodoType } from "../type/TodoType";

function CardItem({ item, onEdit }: { item: TodoType; onEdit: Function }) {
  return (
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
  );
}

export default CardItem;
