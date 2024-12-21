'use client'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, Button } from '@mui/material';

import type { apiDetailType } from '@/types'

interface ListTableProps {
    page: number
    totalRows: number
    data: apiDetailType[] 
    onPageChange: (event: React.MouseEvent | null, newPage: number) => void
    onClickBtn: (apiDetail: apiDetailType) => void
}

export default function ListTable({ page, totalRows, data, onPageChange, onClickBtn }: ListTableProps) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>API 이름</TableCell>
                        <TableCell>API 코드</TableCell>
                        <TableCell>API 설명</TableCell>
                        <TableCell>모듈 코드</TableCell>
                        <TableCell>모듈 이름</TableCell>
                        <TableCell>키워드 코드</TableCell>
                        <TableCell>키워드 이름</TableCell>
                        <TableCell>제공 기관</TableCell>
                        <TableCell>호출</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => {
                        return (
                            <TableRow key={row.apiCdUid}>
                                <TableCell>{row.apiNm}</TableCell>
                                <TableCell>{row.apiCd}</TableCell>
                                <TableCell>{row.apiDesc}</TableCell>
                                <TableCell>{row.mdulCustCd}</TableCell>
                                <TableCell>{row.mdulNm}</TableCell>
                                <TableCell>{row.kwrdCd}</TableCell>
                                <TableCell>{row.kwrdNm}</TableCell>
                                <TableCell>{row.prvr}</TableCell>
                                <TableCell><Button variant="outlined" onClick={() => onClickBtn(row)}>호출</Button></TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[10]}
                count={totalRows}
                rowsPerPage={10}
                page={page}
                onPageChange={onPageChange}
            />
        </TableContainer>
    )
}
