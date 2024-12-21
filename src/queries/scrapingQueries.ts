import { useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'

import { api } from '@/helpers'
import { QUERY_KEY } from '@/queries'

export const useScrapingQuery = (mdulCustCd: string, apiCd: string) => {
    const [ cookies ] = useCookies(['token'])

    const { isLoading, isError, error, data } = useQuery({
        queryKey: [QUERY_KEY.SCRAPING, mdulCustCd, apiCd],
        queryFn: async () => {
            const response = await api.get('/admin/api/recruit/scrp-recruit', { mdulCustCd, apiCd }, {headers: {Authorization: `Bearer ${cookies.token?.accessToken}`}}) 
                
            return response.data.data
        }
    })

    if (data) {
        const selectedApis = localStorage.getItem(`${cookies.token.identification}_selectedApis`)
        if (selectedApis) {
            const apis = JSON.parse(selectedApis)
            apis[apis.length - 1].output = data.out            
            localStorage.setItem(`${cookies.token.identification}_selectedApis`, JSON.stringify(apis))
        }
    }


    return { isLoading, isError, error, data }
} 
