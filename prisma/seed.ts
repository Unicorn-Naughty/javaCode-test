import { todosTest } from "../constants/prisma-const/test-todo";
import prisma from "./prisma-client";

async function up() {
    await prisma.todo.createMany({
        data: todosTest
    })
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "Todo" RESTART IDENTITY CASCADE`;
}
async function main() {
    try {
        await down()
        await up()
    } catch (error) {
        console.log(error);
    }
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.log(e);
    await prisma.$disconnect()
    process.exit(1)
})