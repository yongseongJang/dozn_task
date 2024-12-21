'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'
import { useQueryClient } from '@tanstack/react-query'

import { MUTATION_KEY } from '@/mutations'

export default function AuthTimeoutWatcher({ children }: { children: React.ReactNode}) {
    const router = useRouter()
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const queryClient = useQueryClient()
    const loginSuccessFlag = queryClient.getQueryData([MUTATION_KEY.LOGIN_SUCCESS]) 
    
    useEffect(() => {
        const tokenInfo = cookies.token
        if (tokenInfo) {
            const interval = setInterval(() => {
                const { expirationTime } = tokenInfo
                if (expirationTime && new Date(Date.now()) > new Date(expirationTime)) {
                    clearInterval(interval)
                    queryClient.removeQueries({
                        queryKey: [MUTATION_KEY.LOGIN_SUCCESS],
                        exact: true
                    })
                    removeCookie('token') 
                    router.push('/login')
                }
            }, 1000)

            return () => clearInterval(interval)
        } else {
            router.push('/login')
        }

    }, [loginSuccessFlag])     
    
    return (
         <>{children}</>
    ) 
}