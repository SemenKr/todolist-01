import { Button as ShadcnButton } from './button' // ← импортируем shadcn button
import { ReactNode } from 'react';

type Props = {
    title?: string
    children?: ReactNode
    onClick: () => void
    className?: string
    variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
}

export const CustomButton = ({
                                 title,
                                 children,
                                 onClick,
                                 className = '',
                                 variant = 'outline',
                                 size = 'default',
                                 disabled,
                                 type = 'button'
                             }: Props) => {
    const onClickHandler = () => {
        if (!disabled) {
            onClick()
        }
    }

    return (
        <ShadcnButton
            onClick={onClickHandler}
            variant={variant}
            size={size}
            className={`cursor-pointer ${className}`}
            disabled={disabled}
            type={type}
        >
            {children || title}
        </ShadcnButton>
    )
}
