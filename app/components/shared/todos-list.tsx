"use client";
import { useTodoStore } from "@/hooks/use-store";
import React from "react";
import { TodoItem } from "./todo-item";
import { cn } from "@/lib/utils";
import { TodoListTitle } from "./todo-list-title";
import { AddedTodoItem } from "./added-todo-item";
import ClipLoader from "react-spinners/ClipLoader";
import { getNoun } from "@/lib/get-noun";
import { Skeleton } from "../ui/skeleton";

interface Props {
  className?: string;
}

const override: React.CSSProperties = {
  margin: "0 auto",
  borderColor: "grey",
};

export const TodosList: React.FC<Props> = ({ className }) => {
  const {
    items,
    addTodo,
    loading,
    fetchLoading,
    deleteTodo,
    patchTodo,
    tagCompleted,
  } = useTodoStore();
  return (
    <div
      className={cn(
        `w-[600px] relative mx-auto border border-opacity-5 rounded-lg shadow-xl ${
          loading && "pointer-events-none opacity-60"
        }`,
        className
      )}
    >
      <ClipLoader
        className="left-0 right-0 mx-auto top-[25%]  absolute"
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

      <div className="text-center  border-black border-b border-opacity-10 p-5">
        <div>
          <TodoListTitle title="Todo-List-App" className="" />
          <div className="flex justify-center items-center gap-2">
            <div>Активные: </div>
            <div className="flex gap-2 justify-center">
              <div className="">
                {fetchLoading ? <Skeleton className="w-[13px] h-[17px]" /> : items.filter((item) => !item.doneStatus).length}
              </div>
              <div>
                {fetchLoading ? (
                  <Skeleton className="w-[51px] h-[17px]" />
                ) : (
                  getNoun(
                    items.filter((item) => !item.doneStatus).length,
                    "задача",
                    "задачи",
                    "задач"
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <AddedTodoItem addTodo={addTodo} className="mt-[10px]" />
      </div>

      <div className={cn("flex flex-col p-7  gap-3 ")}>
        {fetchLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div className="flex justify-between h-[36px]" key={i}>
              <div className="flex items-center space-x-2 group">
                <Skeleton className="w-[20px] h-[20px]" />
                <Skeleton className="w-[300px] h-[18px]" />
              </div>
              <div className="flex gap-2 items-center">
                <Skeleton className="w-[24px] h-[24px]" />
                <Skeleton className="w-[24px] h-[24px]" />
              </div>
            </div>
          ))}

        {items.map((item, i) => (
          <TodoItem
            tagCompleted={tagCompleted}
            patchTodo={patchTodo}
            key={i}
            item={item}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};
