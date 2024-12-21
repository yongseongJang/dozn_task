import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { LoginForm } from '@/app/login/components'
import styles from './page.module.css' 

export default async function LoginPage() {
    const cookieStore = await cookies() 
    if (cookieStore.get('token')) {
        redirect('/list')
    } 

    return (
        <div className={styles.wrapper}><LoginForm/></div>
    )
}
