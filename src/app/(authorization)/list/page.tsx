import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { ListFetcher } from '@/app/(authorization)/list/components'

export default async function ListPage() {
    const cookieStore = await cookies()
    if (cookieStore.get('token')) {
        return (
            <ListFetcher />
        )
    } else {
        redirect('/login')
        
        return (
            <></>
        )
    }
}
