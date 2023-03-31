import { TodoType } from "../type/TodoType";
import CardItem from "./CardItem";

type TodoCardProps = {
  title: string;
  items: TodoType[];
  onEdit: Function;
};

function ToDoCard(props: TodoCardProps) {
  return (
    <div className="w-full bg-slate-100 m-4 p-4">
      <h2>{props.title}</h2>
      <hr className="border border-gray-500" />
      {props.items.map((item) => (
        <CardItem
          key={item.id}
          item={item}
          onEdit={(item: TodoType) => props.onEdit(item)}
        />
      ))}
    </div>
  );
}

export default ToDoCard;
