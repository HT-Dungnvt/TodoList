import { useEffect, useState } from "react";
import styled from "styled-components";
import { STATUS, TodoType } from "../type/TodoType";
import { TheDialog, TheForm, TheInput } from "../assets/styled";

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

  const resetForm = () => {
    setForm({
      id: item.id,
      title: "",
      description: "",
      status: STATUS.OPEN,
    });
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    onSubmit(form);

    resetForm();
  };

  const handleCancel = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    onCancel();

    !isEdit && resetForm();
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
    <TheDialog visible={visible}>
      <TheForm>
        <h3 className="text-center">TODO</h3>
        <span>Id: {form.id}</span>
        <label htmlFor="title">Title</label>
        <TheInput
          type="text"
          value={form.title}
          onChange={(e) => handleChange({ title: e.target.value })}
        />
        <label htmlFor="description">Description</label>
        <textarea
          className="rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 focus:outline-none sm:text-sm sm:leading-6"
          rows={3}
          cols={20}
          value={form.description}
          onChange={(e) => handleChange({ description: e.target.value })}
        />
        <label htmlFor="status">Status</label>
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
      </TheForm>
    </TheDialog>
  );
}

export default ItemDetail;
