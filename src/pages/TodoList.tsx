import { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import CardItem from "../components/CardItem";
import ItemDetail from "../components/ItemDetail";
import { STATUS, TodoType } from "../type/TodoType";

type ColumnType = {
  title: string;
  items: TodoType[];
  status: STATUS;
};

type ColumnsType = {
  [key: string]: ColumnType;
};

const columnsDefault: ColumnsType = {
  [STATUS[STATUS.OPEN]]: {
    title: "Open",
    items: [],
    status: STATUS.OPEN,
  },
  [STATUS[STATUS.INPROGRESS]]: {
    title: "Inprogress",
    items: [],
    status: STATUS.INPROGRESS,
  },
  [STATUS[STATUS.DONE]]: {
    title: "Done",
    items: [],
    status: STATUS.DONE,
  },
  [STATUS[STATUS.ARCHIVED]]: {
    title: "Archived",
    items: [],
    status: STATUS.ARCHIVED,
  },
};

const listItemDefault: TodoType[] = [
  {
    description: "1",
    id: 1,
    status: 1,
    title: "1",
  },
  {
    description: "1",
    id: 2,
    status: 2,
    title: "2",
  },
  {
    description: "1",
    id: 3,
    status: 3,
    title: "3",
  },
];

function ToDoList() {
  const [listItem, setListItem] = useState<TodoType[]>(listItemDefault);
  const [itemId, setItemId] = useState(listItemDefault.length + 1);
  const [isEdit, setIsEdit] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [itemDetail, setItemDetail] = useState<TodoType>({
    id: 1,
    title: "",
    description: "",
    status: STATUS.OPEN,
  });

  const showAddItemDialog = () => {
    setIsEdit(false);

    setItemDetail({
      id: itemId,
      title: "",
      description: "",
      status: STATUS.OPEN,
    });

    setDialogVisible((prev) => !prev);
  };

  const showDetailItemDialog = (item: TodoType) => {
    setIsEdit(true);
    setItemDetail(item);

    setDialogVisible((prev) => !prev);
  };

  const handleSubmitForm = (form: TodoType) => {
    setListItem((prevForm) => [...prevForm, form]);
    setDialogVisible((prev) => !prev);
    setItemId((prevId) => ++prevId);
  };

  const handleUpdateForm = (form: TodoType) => {
    const index = listItem.findIndex((item) => item.id === form.id);

    const list = [...listItem];
    list.splice(index, 1, form);

    setListItem(list);
    setDialogVisible((prev) => !prev);
  };

  const handleDeleteForm = (id: number) => {
    const index = listItem.findIndex((item) => item.id === id);

    const list = [...listItem];
    list.splice(index, 1);

    setListItem(list);
    setDialogVisible((prev) => !prev);
  };

  const [columns, setColumns] = useState<ColumnsType>(columnsDefault);

  useEffect(() => {
    const openList = listItem.filter((item) => item.status === STATUS.OPEN);
    setColumns((prev) => ({
      ...prev,
      [STATUS[STATUS.OPEN]]: { ...prev[STATUS[STATUS.OPEN]], items: openList },
    }));

    const inprogressList = listItem.filter(
      (item) => item.status === STATUS.INPROGRESS
    );
    setColumns((prev) => ({
      ...prev,
      [STATUS[STATUS.INPROGRESS]]: {
        ...prev[STATUS[STATUS.INPROGRESS]],
        items: inprogressList,
      },
    }));

    const doneList = listItem.filter((item) => item.status === STATUS.DONE);
    setColumns((prev) => ({
      ...prev,
      [STATUS[STATUS.DONE]]: { ...prev[STATUS[STATUS.DONE]], items: doneList },
    }));

    const archivedList = listItem.filter(
      (item) => item.status === STATUS.ARCHIVED
    );
    setColumns((prev) => ({
      ...prev,
      [STATUS[STATUS.ARCHIVED]]: {
        ...prev[STATUS[STATUS.ARCHIVED]],
        items: archivedList,
      },
    }));
  }, [listItem]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems.map((item) => ({
            ...item,
            status: STATUS[destination.droppableId as keyof typeof STATUS],
          })),
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center px-4">
        <h1>To Do List</h1>
        <button
          className="bg-slate-300 h-10 w-40 rounded hover:bg-slate-200"
          onClick={showAddItemDialog}
        >
          Add
        </button>
      </div>
      <div className="w-full flex">
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          {Object.entries(columns).map(([columnId, column]) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided, snapshot) => (
                <div
                  className="w-full bg-slate-100 m-4 p-4"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  key={columnId}
                >
                  <h2>{column.title}</h2>
                  <hr className="border border-gray-500" />
                  {column.items.map((item, index) => (
                    <CardItem
                      key={item.id}
                      item={item}
                      index={index}
                      onEdit={(item: TodoType) => showDetailItemDialog(item)}
                    ></CardItem>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
      <ItemDetail
        item={itemDetail}
        visible={dialogVisible}
        isEdit={isEdit}
        onCancel={() => setDialogVisible((prev) => !prev)}
        onSubmit={handleSubmitForm}
        onUpdate={handleUpdateForm}
        onDelete={handleDeleteForm}
      ></ItemDetail>
    </div>
  );
}

export default ToDoList;
