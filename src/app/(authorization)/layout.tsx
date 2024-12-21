import { Breadcrumbs, Link } from '@mui/material'

export default function AuthorizationLayout({ children }: {children: React.ReactNode}) {
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
}