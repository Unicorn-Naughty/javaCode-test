"use client";
import React from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { TPostTodo } from "@/app/api/todos/route";
import toast from "react-hot-toast";
interface Props {
  className?: string;
  addTodo: (values: TPostTodo) => Promise<void>;
}

export const AddedTodoItem: React.FC<Props> = ({ className, addTodo }) => {
  const [value, setValue] = React.useState("");

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onKeyPressAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      if (value.length > 6) {
        addTodo({ name: value });

        setValue("");
      } else {
        toast.error("Менее 6 символов");
      }
    }
  };

  const onButtonClick = () => {
    if (value.length > 6) {
      addTodo({ name: value });
      setValue("");
    } else {
      toast.error("Менее 6 символов");
    }
  };

  return (
    <div className={cn("flex items-center gap-4 px-6", className)}>
      <Input
        name="add"
        onKeyDown={(e) => onKeyPressAdd(e)}
        placeholder="Введите текст"
        value={value}
        onChange={onChangeInput}
      />
      <Button onClick={() => onButtonClick()} title="Добавить товар">
        +
      </Button>
    </div>
  );
};
