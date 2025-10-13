import {Button as UiButton} from '@/components/ui/button'

type Props = {
    title: string
    onClick: () => void
    className?: string
    variant?: 'default' | 'outline' | 'ghost'
    size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'
}

export const CustomButton = ({title, onClick, className, variant = 'outline', size = 'default'}: Props) => {
    const onClickHandler = () => {
        onClick()
    }

    return <UiButton
        onClick={onClickHandler}
        variant={variant}
        size={size}
        className={className}
    >
        {title}
    </UiButton>
}
