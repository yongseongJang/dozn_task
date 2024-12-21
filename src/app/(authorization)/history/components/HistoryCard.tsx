'use client'

import { useState } from 'react'
import { Stack, Card, CardContent, Typography, Checkbox} from '@mui/material'

import { Popup } from '@/app/(authorization)/components'

import type { apiDetailType } from '@/types'

interface HistoryCardProps {
    index: number
    apiDetail: apiDetailType
    onChange: (e: React.ChangeEvent<HTMLInputElement>,index: number) => void
}

export default function HistoryCard({ index, apiDetail, onChange }: HistoryCardProps) {
    const [ isVisiblePopup, setIsVisiblePopup] = useState<boolean>(false)

    const handleVisiblePopup = () => {
        setIsVisiblePopup((isVisiblePopup) => !isVisiblePopup)
    }

    const handleCheckBoxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e, index)
    } 

    return (
        <>
            <Card sx={{ width: 330, cursor: 'pointer' }} onClick={handleVisiblePopup}>
                <Stack direction="row-reverse">
                    <Checkbox checked={apiDetail.bookmark} onChange={handleCheckBoxClick} onClick={(e) => {e.stopPropagation()}}/>
                </Stack>
                <CardContent>
                    <Typography>
                      {`호출 시간: ${new Date(Number(apiDetail.date)).toISOString()}`}
                    </Typography>
                    <Typography>
                      {`API 이름: ${apiDetail.apiNm}`}
                    </Typography>
                    <Typography>
                      {`API 코드: ${apiDetail.apiCd}`}
                    </Typography>
                    <Typography>
                      {`모듈 코드: ${apiDetail.mdulCustCd}`}
                    </Typography>
                    <Typography>
                      {`모듈 이름: ${apiDetail.mdulNm}`}
                    </Typography>
                </CardContent>
            </Card>
            { isVisiblePopup && <Popup output={apiDetail.output} onClickBtn={handleVisiblePopup}/>}
        </>
    )
}
