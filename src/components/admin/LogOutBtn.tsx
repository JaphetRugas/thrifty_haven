import React from 'react'
import { signOut } from '@/app/actions/admin.auth.actions'
import { 
  LogOut,
} from "lucide-react"

export default function LogOutBtn() {
    return (
        <div>
            <form action={signOut}>
                <button type="submit">
                    <LogOut className="mr-2 h-4 w-4" />
                </button>
            </form>
        </div>
    )
}
