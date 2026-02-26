import {setIsLoggedInAC} from '@/app/appSlice';
import {AUTH_TOKEN} from '@/common/constants'
import {Alert, AlertDescription} from '@/common/components/ui/alert';
import {Button} from '@/common/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/common/components/ui/card';
import {Checkbox} from '@/common/components/ui/checkbox';
import {Input} from '@/common/components/ui/input';
import {Label} from '@/common/components/ui/label';
import {ResultCode} from '@/common/enums'
import {useAppDispatch} from '@/common/hooks/useAppDispatch';
import {useLazyGetCaptchaUrlQuery, useLoginMutation} from '@/feature/auth/api/authApi';
import {type LoginInputs, loginSchema} from '@/feature/auth/lib/schemas';
import {zodResolver} from '@hookform/resolvers/zod'
import {Eye, EyeOff} from 'lucide-react';
import {useState} from 'react'
import {Controller, type SubmitHandler, useForm} from 'react-hook-form'

export const Login = () => {
    const dispatch = useAppDispatch()

    const [login] = useLoginMutation()
    const [getCaptchaUrl] = useLazyGetCaptchaUrlQuery()

    const [captchaUrl, setCaptchaUrl] = useState<string | null>(null)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

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
        <div className="h-full bg-background flex items-center justify-center px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-2xl">Sign in</CardTitle>
                    <CardDescription>
                        Use the test account or register on the official site to login.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="rounded-lg border bg-muted/30 px-4 py-3 text-sm text-muted-foreground space-y-1">
                        <p>
                            To login get registered{" "}
                            <a
                                href="https://social-network.samuraijs.com"
                                target="_blank"
                                rel="noreferrer"
                                className="text-primary underline-offset-4 hover:underline"
                            >
                                here
                            </a>
                        </p>
                        <p>
                            <span className="font-medium text-foreground">Email:</span> free@samuraijs.com
                        </p>
                        <p>
                            <span className="font-medium text-foreground">Password:</span> free
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="email@example.com"
                                aria-invalid={Boolean(errors.email)}
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={isPasswordVisible ? "text" : "password"}
                                    placeholder="••••••••"
                                    aria-invalid={Boolean(errors.password)}
                                    {...register('password')}
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    aria-label={isPasswordVisible ? "Скрыть пароль" : "Показать пароль"}
                                >
                                    {isPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password.message}</p>
                            )}
                        </div>

                        {captchaUrl && (
                            <div className="space-y-2">
                                <img src={captchaUrl} alt="captcha" className="h-12" />
                                <Label htmlFor="captcha">Captcha</Label>
                                <Input
                                    id="captcha"
                                    placeholder="Enter captcha"
                                    aria-invalid={Boolean(errors.captcha)}
                                    {...register('captcha')}
                                />
                                {errors.captcha && (
                                    <p className="text-sm text-destructive">{errors.captcha.message}</p>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            <Controller
                                name="rememberMe"
                                control={control}
                                render={({field}) => (
                                    <Checkbox
                                        id="rememberMe"
                                        checked={field.value}
                                        onCheckedChange={(checked) => field.onChange(checked === true)}
                                    />
                                )}
                            />
                            <Label htmlFor="rememberMe" className="text-sm font-normal">
                                Remember me
                            </Label>
                        </div>

                        {errors.root?.message && (
                            <Alert variant="destructive">
                                <AlertDescription>{errors.root.message}</AlertDescription>
                            </Alert>
                        )}

                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
