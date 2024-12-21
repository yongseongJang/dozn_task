import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Breadcrumbs, Link } from '@mui/material'

export default async function AuthorizationLayout({ children }: {children: React.ReactNode}) {
    const cookieStore = await cookies()
    if (cookieStore.get('token')) {
        return (
            <>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/list">
                      LIST 
                    </Link>
                    <Link underline="hover" color="inherit" href="/history">
                      HISTORY 
                    </Link>
                </Breadcrumbs>
                {children}
            </>
        )
    } else {
        redirect('/login')
        
        return (
            <></>
        )
    }
}