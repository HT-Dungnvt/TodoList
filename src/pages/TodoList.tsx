import { useState } from "react";
import ItemDetail from "../components/ItemDetail";
import TodoCard from "../components/TodoCard";
import { STATUS, TodoType } from "../type/TodoType";

function ToDoList() {
  const [listItem, setListItem] = useState<TodoType[]>([]);
  const [itemId, setItemId] = useState(1);
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

  const openList = listItem.filter((item) => item.status === STATUS.OPEN);
  const inprogressList = listItem.filter(
    (item) => item.status === STATUS.INPROGRESS
  );
  const doneList = listItem.filter((item) => item.status === STATUS.DONE);
  const archivedList = listItem.filter(
    (item) => item.status === STATUS.ARCHIVED
  );

  return (
    <div className="flex flex-col justify-center items-center relative">
      <h1>To Do List</h1>
      <button
        className="bg-slate-300 h-10 w-40 rounded hover:bg-slate-200"
        onClick={showAddItemDialog}
      >
        Add
      </button>
      <div className="w-full flex">
        <TodoCard
          title="Open"
          items={openList}
          onEdit={(item: TodoType) => showDetailItemDialog(item)}
        />

        <TodoCard
          title="Inprogress"
          items={inprogressList}
          onEdit={(item: TodoType) => showDetailItemDialog(item)}
        />

        <TodoCard
          title="Done"
          items={doneList}
          onEdit={(item: TodoType) => showDetailItemDialog(item)}
        />

        <TodoCard
          title="Archived"
          items={archivedList}
          onEdit={(item: TodoType) => showDetailItemDialog(item)}
        />
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
