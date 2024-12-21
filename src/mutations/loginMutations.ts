import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'

import { api } from '@/helpers'
import { MUTATION_KEY } from '@/mutations'

export const useLoginMutation = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const [ cookies, setCookie ] = useCookies(['token'])

    return useMutation({
        mutationKey: [MUTATION_KEY.LOGIN],
        mutationFn: async ({ admUserId, userPw }: { admUserId: string, userPw: string }) => {
            const response = await api.post('/admin/api/recruit/login-check', { admUserId, userPw }) 
            return response.data
        },
        onSuccess: (response) => {
            const accessToken = response.data.accessToken
            const payload = JSON.parse(atob(accessToken.split('.')[1]))
            setCookie('token', { accessToken, identification: payload.identification, expirationTime: Date.now() + payload.exp } )

            queryClient.removeQueries({
                queryKey: [MUTATION_KEY.LOGIN_FAIL],
                exact: true
            })
            queryClient.setQueryData([MUTATION_KEY.LOGIN_SUCCESS], true)

            router.push('/list')
        },
        onError: (err) => {
            queryClient.removeQueries({
                queryKey: [MUTATION_KEY.LOGIN_SUCCESS],
                exact: true
            })
            queryClient.setQueryData([MUTATION_KEY.LOGIN_FAIL], true)
        } 
    }) 
}
