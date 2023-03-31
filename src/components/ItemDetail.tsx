import { useEffect, useState } from "react";
import styled from "styled-components";
import { STATUS, TodoType } from "../type/TodoType";

type DialogProps = {
  visible: boolean;
};
const Dialog = styled.div<DialogProps>`
  display: ${(props) => (props.visible ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const DialogContent = styled.form`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  z-index: 5;
  background-color: #fff;
  padding: 16px;
  border-radius: 5%;
  box-shadow: 0 1px 2px #ccc;
  min-width: 360px;
`;

const Button = styled.button`
  height: 2.5rem;
  width: 8rem;
  background-color: #cbd5e1;
  border-radius: 0.25rem;
  border: none;

  &:hover {
    background-color: #e2e8f0;
    cursor: pointer;
  }

  & + & {
    margin-left: 8px;
  }
`;

function ItemDetail({
  item,
  visible,
  isEdit = false,
  onCancel,
  onSubmit,
  onUpdate,
  onDelete,
}: {
  item: TodoType;
  visible: boolean;
  isEdit: boolean;
  onCancel: Function;
  onSubmit: Function;
  onUpdate: Function;
  onDelete: Function;
}) {
  const [form, setForm] = useState(item);

  useEffect(() => {
    setForm(item);
  }, [item]);

  const handleChange = (value: Object) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        ...value,
      };
    });
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    onSubmit(form);

    setForm({
      id: item.id,
      title: "",
      description: "",
      status: STATUS.OPEN,
    });
  };

  const handleCancel = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    onCancel();
    setForm({
      id: item.id,
      title: "",
      description: "",
      status: STATUS.OPEN,
    });
  };

  const handleUpdate = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    onUpdate(form);
  };

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    onDelete(form.id);
  };
  return (
    <Dialog visible={visible}>
      <DialogContent>
        <h3 className="text-center">TODO</h3>
        <span>Id: {form.id}</span>
        <label htmlFor="title">Title</label>
        <input
          className="rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 focus:outline-none sm:text-sm sm:leading-6"
          type="text"
          value={form.title}
          onChange={(e) => handleChange({ title: e.target.value })}
        />
        <label htmlFor="title">Description</label>
        <textarea
          className="rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 focus:outline-none sm:text-sm sm:leading-6"
          rows={3}
          cols={20}
          value={form.description}
          onChange={(e) => handleChange({ description: e.target.value })}
        />
        <label htmlFor="title">Status</label>
        <select
          value={form.status}
          className="rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm sm:leading-6"
          onChange={(e) => handleChange({ status: Number(e.target.value) })}
        >
          <option value={STATUS.OPEN}>Open</option>
          <option value={STATUS.INPROGRESS}>Inprogress</option>
          <option value={STATUS.DONE}>Done</option>
          <option value={STATUS.ARCHIVED}>Archived</option>
        </select>
        <div className="flex mt-4 justify-between">
          <Button onClick={handleCancel}>Cancel</Button>
          {isEdit ? (
            <>
              <Button onClick={handleDelete}>Delete</Button>
              <Button onClick={handleUpdate}>Update</Button>
            </>
          ) : (
            <Button onClick={handleSubmit}>Submit</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ItemDetail;
