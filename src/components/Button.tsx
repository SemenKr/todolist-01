import {Button as UiButton} from '@/components/ui/button'
import {ReactNode} from 'react';

type Props = {
    title?: string
    children?: ReactNode
    onClick: () => void
    className?: string
    variant?: 'default' | 'outline' | 'ghost'
    size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
}

export const Button = ({title, children, onClick, className, variant = 'outline', size = 'default', disabled, type = 'button'}: Props) => {
    const onClickHandler = () => {
        if (!disabled) { // ← проверяем disabled
            onClick()
        }
    }

    return <UiButton
        onClick={onClickHandler}
        variant={variant}
        size={size}
        className={className}
        disabled={disabled}
        type={type}
    >
        {children || title} {/* ← поддержка обоих вариантов */}
    </UiButton>
}
