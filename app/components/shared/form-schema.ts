import { z } from 'zod'
export const formSchema = z.object({
    add: z.string().min(6, { message: 'Введено менее 6 символов' })
})