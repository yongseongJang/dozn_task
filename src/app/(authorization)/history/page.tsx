'use client'

import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Stack, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material'

import { HistoryCard } from '@/app/(authorization)/history/components'
import { apiDetailType } from '@/types'

export default function HistoryPage() {
    const [ cookies ]= useCookies(['token'])
    const [ order, setOrder ] = useState<string>('desc')
    const [ selectedApis, setSelectedApi ] = useState<apiDetailType[]>([])

    useEffect(() => {
        const selectedApis = localStorage.getItem(`${cookies.token.identification}_selectedApis`) 
        if (selectedApis) {
            setSelectedApi(JSON.parse(selectedApis).sort((a: apiDetailType, b: apiDetailType) => { 
                if (a.bookmark !== b.bookmark) {
                    return a.bookmark ? -1 : 1                 
                } 

                return b.date - a.date 
            }))
        }
    }, [])
    
    const handleOrderChange = (e: React.SyntheticEvent) => {
        const value = (e.target as HTMLInputElement).value
        setOrder(value)
        setSelectedApi(selectedApis.sort((a: apiDetailType, b: apiDetailType) => {
            if (a.bookmark !== b.bookmark) {
                return a.bookmark ? -1 : 1
            }
            if (value === 'asc') {
                return a.date - b.date
            } else {
                return b.date - a.date
            }
        }))
    }
    
    const handleBookmarkChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const apis = [...selectedApis.slice(0, index), {...selectedApis[index], bookmark: e.target.checked}, ...selectedApis.slice(index + 1)]  
        setSelectedApi(apis.sort((a: apiDetailType, b: apiDetailType) => {
                if (a.bookmark !== b.bookmark) {
                    return a.bookmark ? -1 : 1
                }
                if (order === 'asc') {
                    return a.date - b.date
                } else {
                    return b.date - a.date
                }
            }))
        localStorage.setItem(`${cookies.token.identification}_selectedApis`, JSON.stringify(apis))
    }
    
    return (
        <>
        <Stack direction="row" spacing={2}>
            <FormControl>
                <RadioGroup row value={order}>
                    <FormControlLabel onChange={handleOrderChange} value="desc" control={<Radio />} label="최신 순"></FormControlLabel>
                    <FormControlLabel onChange={handleOrderChange} value="asc" control={<Radio />} label="오래된 순"></FormControlLabel>
                </RadioGroup>
            </FormControl>
        </Stack>
        <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: 'wrap'}} >
            {selectedApis && selectedApis.map((api: apiDetailType, index: number) => {
                return (
                    <HistoryCard key={api.date} index={index} apiDetail={api} onChange={handleBookmarkChange}></HistoryCard>
                )
            })}
        </Stack>
        </>
    )
}
