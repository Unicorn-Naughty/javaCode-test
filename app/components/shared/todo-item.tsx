import { cn } from "@/lib/utils";
import { TTodo } from "@/types/prisma";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Pencil, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TPostTodo } from "@/app/api/todos/route";
import toast from "react-hot-toast";

interface Props {
  className?: string;
  item: TTodo;
  deleteTodo: (id: number) => Promise<void>;
  patchTodo: (id: number, values: TPostTodo) => Promise<void>;
  tagCompleted: (id: number) => void;
}

export const TodoItem: React.FC<Props> = ({
  className,
  item,
  deleteTodo,
  patchTodo,
  tagCompleted,
}) => {
  const [changedOpen, setChangedOpen] = React.useState(false);

  const [value, setValue] = React.useState("");

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onKeyPressAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      if (value.length > 6) {
        patchTodo(item.id, { name: value });
        setChangedOpen(false);
        setValue("");
      } else {
        toast.error("Менее 6 символов");
      }
    }
  };

  const onButtonClick = () => {
    if (value.length > 6) {
      patchTodo(item.id, { name: value });
      setChangedOpen(false);
      setValue("");
    } else {
      toast.error("Менее 6 символов");
    }
  };

  const onClickDelete = () => {
    const question = confirm(
      `Вы уверены, что хотите удалить задачу - ${item.name} ?`
    );
    if (question) {
      deleteTodo(item.id);
    }
  };

  return (
    <div className={cn("flex justify-between ", className)}>
      <div className="flex items-center space-x-2 group">
        <Checkbox
          checked={item.doneStatus}
          onClick={() => tagCompleted(item.id)}
          id={item.name}
          className={`${
            changedOpen && "pointer-events-none cursor-default opacity-60"
          }`}
        />
        {changedOpen ? (
          <div className="flex gap-2">
            <Input
              onKeyDown={(e) => onKeyPressAdd(e)}
              onChange={(e) => onChangeInput(e)}
              value={value}
              className="w-[350px]"
              placeholder="Введите текст"
              name={item.name}
            />
            <Button onClick={() => onButtonClick()}>Done</Button>
          </div>
        ) : (
          <label
            htmlFor={item.name}
            className="flex items-center h-[36px] text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            <div
              className={`text-[18px] px-[5px] group-hover:opacity-50 transition-all ease-linear cursor-pointer ${
                item.doneStatus && "line-through opacity-50"
              }`}
            >
              {item.name.length >= 80
                ? item.name.substring(0, 80) + "..."
                : item.name}
            </div>
          </label>
        )}
      </div>
      <div className="flex gap-2 items-center">
        <button
          title="Редактировать товар"
          className="hover:opacity-50 transition-all ease-linear"
          onClick={() => setChangedOpen(!changedOpen)}
        >
          <Pencil />
        </button>
        <button
          onClick={onClickDelete}
          title="Удалить товар"
          className="hover:opacity-50 transition-all ease-linear"
        >
          <Trash2 />
        </button>
      </div>
    </div>
  );
};
