import {setIsLoggedInAC} from '@/app/appSlice';

import {AUTH_TOKEN} from '@/common/constants'
import {ResultCode} from '@/common/enums'
import {useAppDispatch} from '@/common/hooks/useAppDispatch';
import {useLazyGetCaptchaUrlQuery, useLoginMutation} from '@/feature/auth/api/authApi';
import {type LoginInputs, loginSchema} from '@/feature/auth/lib/schemas';
import {zodResolver} from '@hookform/resolvers/zod'
import * as Checkbox from '@radix-ui/react-checkbox'
import {CheckIcon} from 'lucide-react';
import {useState} from 'react'
import {Controller, type SubmitHandler, useForm} from 'react-hook-form'

export const Login = () => {
    const dispatch = useAppDispatch()

    const [login] = useLoginMutation()
    const [getCaptchaUrl] = useLazyGetCaptchaUrlQuery()

    const [captchaUrl, setCaptchaUrl] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        control,
        setError,
        formState: {errors},
    } = useForm<LoginInputs>({
        resolver: zodResolver(loginSchema),
        defaultValues: {email: '', password: '', rememberMe: false, captcha: ''},
    })

    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        const res = await login(data)

        if ('data' in res && res.data?.resultCode === ResultCode.Success) {
            dispatch(setIsLoggedInAC({isLoggedIn: true}))
            localStorage.setItem(AUTH_TOKEN, res.data.data.token)
            setCaptchaUrl(null)
            reset()
        }

        if ('data' in res && res.data?.fieldsErrors?.length) {
            res.data.fieldsErrors.forEach((fieldError) => {
                if (['email', 'password', 'captcha'].includes(fieldError.field)) {
                    setError(fieldError.field as keyof LoginInputs, {
                        type: 'server',
                        message: fieldError.error,
                    })
                }
            })
        }

        if ('data' in res && res.data?.resultCode === ResultCode.Error && res.data.messages?.length) {
            setError('root', {type: 'server', message: res.data.messages[0]})
        }

        if ('data' in res && res.data?.resultCode === ResultCode.CaptchaError) {
            const captchaRes = await getCaptchaUrl()
            if ('data' in captchaRes) {
                setCaptchaUrl(captchaRes.data?.url ?? null)
            }
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-4"
            >
                <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        To login get registered{' '}
                        <a
                            href="https://social-network.samuraijs.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            here
                        </a>
                    </p>
                    <p className="text-sm mt-2">
                        <b>Email:</b> free@samuraijs.com
                    </p>
                    <p className="text-sm">
                        <b>Password:</b> free
                    </p>
                </div>

                <div className="space-y-3">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register('email')}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            {...register('password')}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {captchaUrl && (
                        <div>
                            <img src={captchaUrl} alt="captcha" className="mb-2"/>
                            <input
                                placeholder="Enter captcha"
                                {...register('captcha')}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.captcha && (
                                <p className="text-red-500 text-sm mt-1">{errors.captcha.message}</p>
                            )}
                        </div>
                    )}

                    <div className="flex items-center space-x-2">
                        <Controller
                            name="rememberMe"
                            control={control}
                            render={({field}) => (
                                <Checkbox.Root
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="w-5 h-5 border rounded flex items-center justify-center data-[state=checked]:bg-blue-600"
                                >
                                    <Checkbox.Indicator>
                                        <CheckIcon className="text-white w-4 h-4"/>
                                    </Checkbox.Indicator>
                                </Checkbox.Root>
                            )}
                        />
                        <label className="text-sm">Remember me</label>
                    </div>

                    {errors.root?.message && (
                        <p className="text-red-500 text-sm">{errors.root.message}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}
