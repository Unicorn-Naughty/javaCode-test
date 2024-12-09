import prisma from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export type TPostTodo = {
    name: string
}

export async function GET() {

    try {

        const todos = await prisma.todo.findMany()

        return NextResponse.json(todos)

    } catch (error) {

        console.log(error);
        return NextResponse.json({ message: 'Не удалось получить список дел' }, { status: 500 })

    }
}
export async function POST(req: NextRequest) {

    try {
        const { name } = await req.json() as TPostTodo

        await prisma.todo.create({
            data: {
                name: name,
                doneStatus: false
            }
        })
        const todos = await prisma.todo.findMany()
        return NextResponse.json(todos)

    } catch (error) {

        console.log(error);
        return NextResponse.json({ message: 'Не удалось добавить задачу' }, { status: 500 })
    }
}