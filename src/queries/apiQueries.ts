import { useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'

import { api } from '@/helpers'
import { QUERY_KEY } from '@/queries'

export const useApiListQuery = ({pageSize, pageIndex}: {pageSize: number, pageIndex: number}) => {
    const [ cookies ] = useCookies(['token'])

    const { isLoading, isError, error, data } = useQuery({
        queryKey: [QUERY_KEY.API_LIST, pageSize, pageIndex],
        queryFn: async () => {
            if (cookies.token) {
                const response = await api.get('/admin/api/user/api/list', { pageSize, pageIndex }, {headers: {Authorization: `Bearer ${cookies.token.accessToken}`}}) 

                return response.data.data
            }
        }
    })

    return { isLoading, isError, error, data}
} 
