import { Button } from '@/components/ui';
import {FilterButtonsProps, FilterValueType} from '../../types/types.ts'

export const FilterButtons = ({ currentFilter, onFilterChange }: FilterButtonsProps) => {
    const filters: { value: FilterValueType; label: string; shortLabel?: string }[] = [
        { value: 'all', label: 'All', shortLabel: 'All' },
        { value: 'active', label: 'Active', shortLabel: 'Act' },
        { value: 'completed', label: 'Completed', shortLabel: 'Compl' }
    ]

    const getButtonVariant = (filterValue: FilterValueType) => {
        return currentFilter === filterValue ? 'default' : 'outline'
    }

    return (
        <div className="flex gap-1 sm:gap-2">
            {filters.map((filter) => (
                <Button
                    key={filter.value}
                    title={filter.label} // Полное название для tooltip
                    onClick={() => onFilterChange(filter.value)}
                    variant={getButtonVariant(filter.value)}
                    size="sm"
                    className="flex-1 text-xs sm:text-sm" // Меньший текст на мобильных
                >
                    {/* Показываем короткую версию на мобильных, полную на больших экранах */}
                    <span className="sm:hidden">{filter.shortLabel}</span>
                    <span className="hidden sm:inline">{filter.label}</span>
                </Button>
            ))}
        </div>
    )
}
