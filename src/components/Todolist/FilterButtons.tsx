// components/Todolist/FilterButtons.tsx
import { Button } from '../Button.tsx'
import {FilterButtonsProps, FilterValueType} from '../../types/types.ts'

export const FilterButtons = ({ currentFilter, onFilterChange }: FilterButtonsProps) => {
    const filters: { value: FilterValueType; label: string }[] = [
        { value: 'all', label: 'All' },
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' }
    ]

    const getButtonVariant = (filterValue: FilterValueType) => {
        return currentFilter === filterValue ? 'default' : 'outline'
    }

    return (
        <div className="flex gap-2">
            {filters.map((filter) => (
                <Button
                    key={filter.value}
                    title={filter.label}
                    onClick={() => onFilterChange(filter.value)}
                    variant={getButtonVariant(filter.value)}
                    size="sm"
                    className="flex-1"
                />
            ))}
        </div>
    )
}
