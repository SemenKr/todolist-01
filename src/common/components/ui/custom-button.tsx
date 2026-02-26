import { Button as ShadcnButton } from './button' // ← импортируем shadcn button
import { ReactNode } from 'react';

type Props = {
    title?: string
    children?: ReactNode
    onClick?: () => void
    className?: string
    variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
    asChild?: boolean
}

export const CustomButton = ({
                                 title,
                                 children,
                                 onClick,
                                 className = '',
                                 variant = 'outline',
                                 size = 'default',
                                 disabled,
                                 type = 'button',
                                 asChild = false
                             }: Props) => {
    const onClickHandler = () => {
        if (!disabled) {
            onClick?.()
        }
    }

    return (
        <ShadcnButton
            onClick={onClick ? onClickHandler : undefined}
            variant={variant}
            size={size}
            className={`cursor-pointer ${className}`}
            disabled={disabled}
            type={asChild ? undefined : type}
            asChild={asChild}
        >
            {children || title}
        </ShadcnButton>
    )
}
