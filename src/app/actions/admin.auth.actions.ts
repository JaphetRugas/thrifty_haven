"use server"

import { z } from "zod"
import { signInFormSchema } from "../../types"
import { Argon2id } from "oslo/password" 
import db from "@/database"
import { lucia, validateRequest } from "@/database/auth"
import { cookies } from "next/headers"
import { eq } from "drizzle-orm"

export const signIn = async (values: z.infer<typeof signInFormSchema>) => {  
    const existingUser = await db.query.userTable.findFirst({
        where: (table) => eq(table.email, values.email),
    }) 

    console.log(existingUser)

    if (!existingUser) {
        return {
            success: false,
            error: "User not found"
        }
    }

    const isValidPassword = await new Argon2id().verify(
        existingUser.passwordHash,
        values.password
    )

    if (!isValidPassword) {
        return {
            success: false,
            error: "Incorrect Email or Password"
        }
    }

    const session = await lucia.createSession(existingUser.id, {
        expiresIn: 60 * 60 * 24 * 30, 
    })

    const sessionCookie = lucia.createSessionCookie(session.id)

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return {
        success: "Logged In Succcesfully",
    };
}

export const signOut = async () => {
    try {
        const { session } = await validateRequest();

        if (!session) {
            return {
                error: "Unauthorized"
            }
        }

        await lucia.invalidateSession(session.id);

        const sessionCookie = lucia.createBlankSessionCookie();

        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    } catch (error: any) {
        return {
            error: error?.message,
        }
    }
}   