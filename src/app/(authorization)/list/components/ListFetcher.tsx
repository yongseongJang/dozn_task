'use client'

import { useState } from 'react'
import { useCookies } from 'react-cookie'

import { useApiListQuery } from '@/queries'
import { ListTable, ScrapingFetcher } from '@/app/(authorization)/list/components'

import type { apiDetailType } from '@/types'

const initialSelectedApi = {
    mdulCustCd: '',
    apiCd: ''
}

export default function ListFetcher() {
    const [ cookies ] = useCookies(['token'])
    const [ page, setPage ] = useState<number>(0)
    const [ selectedApi, setSelectedApi ] = useState<any>(initialSelectedApi)
    const { isLoading, isError, error, data } = useApiListQuery({pageSize: 10, pageIndex: page + 1})    
    
     if (isLoading) {
         return (
             <></>
         ) 
    }

    if (isError) {
        throw error
    }
    
    const handlePageChange = (event: React.MouseEvent | null, newPage: number) => {
        setPage(newPage)
    }
    
    const handleBtnClick = (apiDetail: apiDetailType) => {
        setSelectedApi({mdulCustCd: apiDetail.mdulCustCd, apiCd: apiDetail.apiCd})

        const selectedApis = localStorage.getItem(`${cookies.token.identification}_selectedApis`)
        if (selectedApis) {
            localStorage.setItem(`${cookies.token.identification}_selectedApis`, JSON.stringify([...JSON.parse(selectedApis), {date: Date.now() + (9 * 60 * 60 * 1000), bookmark: false, output: {}, ...apiDetail}]))
        } else {
            localStorage.setItem(`${cookies.token.identification}_selectedApis`, JSON.stringify([{date: Date.now(), bookmark: false, output: {}, ...apiDetail}]))
        }
    }
    
    const handleCloseBtnClick = () => {
        setSelectedApi(initialSelectedApi)
    }

    return (
        <>
            <ListTable page={page} data={data.list} totalRows={data.totalCount} onPageChange={handlePageChange} onClickBtn={handleBtnClick}/>
            {selectedApi.mdulCustCd && <ScrapingFetcher mdulCustCd={selectedApi.mdulCustCd} apiCd={selectedApi.apiCd} onClickBtn={handleCloseBtnClick}/>}
        </>
    )
}
