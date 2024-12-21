import { cookies} from 'next/headers'
import { redirect } from 'next/navigation'

export default async function HomePage() {
    const cookieStore = await cookies()
    if (cookieStore.get('token')) {
       redirect('/list')
    } else {
       redirect('/login')
    }
}