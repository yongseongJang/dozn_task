'use client'

import { Typography, Stack, TextField, Button } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { MUTATION_KEY, useLoginMutation } from '@/mutations'

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const queryClient = useQueryClient()
    const loginFailFlag: boolean | undefined = queryClient.getQueryData([MUTATION_KEY.LOGIN_FAIL])
    const loginMutation = useLoginMutation()

    const onSubmit = (data: any) => {
        loginMutation.mutate(data)
    }

    return (
        <Stack spacing={6}>
            <Typography variant="h4" align="center">
                LOGIN
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                    <Stack spacing={1}>
                    <TextField
                        label="ID"
                        {...register("admUserId", { required: true })}
                        aria-valid={errors.admUserId ? 'true' : 'false'}
                    />                
                    {errors.admUserId?.type === 'required' && (
                        <Typography role="alert" color="error">ID is required.</Typography>
                    )}
                    <TextField
                        label="PASSWORD"
                        type="password"
                        {...register("userPw", { required: true })}
                        aria-valid={errors.userPw ? 'true' : 'false'}
                    />                
                    {errors.userPw?.type === 'required' && (
                        <Typography role="alert" color="error">Password is required.</Typography>
                    )}
                    </Stack>
                    {loginFailFlag && (
                        <Typography role="alert" color="error">
                            Please enter id and password correctly.
                        </Typography>
                    )}
                    <Button type="submit" variant="outlined" sx={{ padding: '10px 100px'}}>
                        Login
                    </Button>
                </Stack>
            </form>
        </Stack>
    )    
}
