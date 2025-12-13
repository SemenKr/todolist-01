import {useState,KeyboardEvent} from 'react';
import {Button, Input} from '@/components/ui';
import {Plus} from 'lucide-react';

type CreateItemFormPropsType = {
    onAdd: (title: string) => void;
    placeholder?: string;
};

export const CreateItemForm = ({onAdd, placeholder}: CreateItemFormPropsType) => {

    const [value, setValue] = useState("");

    const add = () => {
        const trimmed = value.trim();
        if (!trimmed) return;
        onAdd(trimmed);
        setValue("");
    };
    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") add();
    };


    return (
        <>
            <div className="flex gap-2">
                <Input
                    placeholder={placeholder ?? "Введите текст..."}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={onEnter}
                />

                <Button disabled={!value.trim()} onClick={add}>
                    <Plus className="h-5 w-5" />
                </Button>
            </div>
        </>
    );
};
