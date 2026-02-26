import {JSX, ReactNode} from 'react';

interface TitleProps {
    children: ReactNode
    className?: string
    level?: 1 | 2 | 3 | 4 | 5 | 6
    centered?: boolean
    noMargin?: boolean // ← добавляем пропс
}

export const Title = ({
                          children,
                          className = '',
                          level = 3,
                          centered = false,
                          noMargin = false // ← значение по умолчанию
                      }: TitleProps) => {
    const baseStyles = "font-bold text-gray-800 dark:text-white"

    const sizeStyles = {
        1: "text-4xl",
        2: "text-3xl",
        3: "text-2xl",
        4: "text-xl",
        5: "text-lg",
        6: "text-base"
    }

    const marginStyles = noMargin ? "mb-0" : {
        1: "mb-8",
        2: "mb-7",
        3: "mb-6",
        4: "mb-5",
        5: "mb-4",
        6: "mb-3"
    }[level]

    const alignment = centered ? "text-center" : "text-left"

    const Tag = `h${level}` as keyof JSX.IntrinsicElements

    return (
        <Tag className={`${sizeStyles[level]} ${baseStyles} ${alignment} ${marginStyles} ${className}`}>
            {children}
        </Tag>
    )
}
