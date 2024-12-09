import { todosTest } from "@/constants/prisma-const/test-todo";
import { Todo } from "@prisma/client";

export type TTodos = typeof todosTest
export type TTodo = Pick<Todo, 'name' | 'doneStatus' | 'id'>