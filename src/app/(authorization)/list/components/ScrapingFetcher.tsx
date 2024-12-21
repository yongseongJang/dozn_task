'use client'

import { useScrapingQuery } from '@/queries'
import { Popup } from '@/app/(authorization)/components'

interface ScrapingFetcherProps {
    mdulCustCd: string,
    apiCd: string,
    onClickBtn: () => void
}

export default function ScrapingFetcher({ mdulCustCd, apiCd, onClickBtn }: ScrapingFetcherProps ) {
    const { isLoading, isError, error, data } = useScrapingQuery(mdulCustCd, apiCd)

     if (isLoading) {
         return (
             <></>
         )
    }
    
    if (isError) {
        throw error
    }

    return (
        <Popup output={data.out} onClickBtn={onClickBtn}/> 
    )
}