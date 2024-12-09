import prisma from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { TPostTodo } from "../route";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {

        const { id } = await params
        const todo = await prisma.todo.findFirst({

            where: {
                id: Number(id)
            }
        })

        if (!todo) {
            return NextResponse.json({ message: 'Не удалось найти задачу' }, { status: 500 })
        }

        await prisma.todo.delete({
            where: {
                id: Number(id)
            }
        })

        const todos = await prisma.todo.findMany()
        return NextResponse.json(todos)

    } catch (error) {

        console.log(error);
        return NextResponse.json({ message: 'Не удалось удалить задачу' }, { status: 500 })
    }
}
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    try {

        const { id } = await params

        const { name } = await req.json() as TPostTodo

        const todo = await prisma.todo.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (!todo) {
            return NextResponse.json({ message: 'Не удалось найти задачу' }, { status: 500 })
        }

        await prisma.todo.update({
            where: {
                id: Number(id)
            },
            data: {
                name
            }
        })

        const todos = await prisma.todo.findMany()
        return NextResponse.json(todos)

    } catch (error) {

        console.log(error);
        return NextResponse.json({ message: 'Не удалось обновить задачу' }, { status: 500 })
    }
}