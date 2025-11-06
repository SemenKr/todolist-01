import { useState } from 'react';
import { Plus} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface AddTodolistDialogProps {
    onAddTodolist: (title: string) => void;
}

export const AddTodolistDialog = ({ onAddTodolist }: AddTodolistDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
        setInputValue('');
    };

    const handleClose = () => {
        if (!isSubmitting) {
            setIsOpen(false);
            setInputValue('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedValue = inputValue.trim();

        if (!trimmedValue) {
            toast.error('Введите название списка');
            return;
        }

        if (trimmedValue.length < 2) {
            toast.error('Название должно содержать минимум 2 символа');
            return;
        }

        if (trimmedValue.length > 50) {
            toast.error('Название слишком длинное (макс. 50 символов)');
            return;
        }

        setIsSubmitting(true);

        try {
            await onAddTodolist(trimmedValue);
            toast.success(`Список "${trimmedValue}" создан!`);
            handleClose();
        } catch (error) {
            toast.error('Ошибка при создании списка');
            console.error('Error adding todolist:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }

        if (e.key === 'Escape') {
            handleClose();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= 50) {
            setInputValue(value);
        }
    };

    const charactersLeft = 50 - inputValue.length;

    return (
        <>
            {/* Floating Action Button */}
            <Button
                onClick={handleOpen}
                size="lg"
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
            >
                <Plus className="h-6 w-6" />
                <span className="sr-only">Добавить новый список</span>
            </Button>

            {/* Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Plus className="h-5 w-5" />
                            Создать новый список
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                placeholder="Введите название списка..."
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyPress}
                                className="text-base h-12"
                                disabled={isSubmitting}
                                autoFocus
                            />
                            {inputValue.length > 0 && (
                                <div className="text-xs text-muted-foreground text-right">
                                    {charactersLeft} символов осталось
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2 justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClose}
                                disabled={isSubmitting}
                            >
                                Отмена
                            </Button>
                            <Button
                                type="submit"
                                disabled={!inputValue.trim() || isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin mr-2" />
                                        Создание...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Создать
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>

                    {/* Подсказки */}
                    <div className="pt-4 border-t border-border">
                        <div className="text-xs text-muted-foreground space-y-1">
                            <div>💡 Нажмите Enter для быстрого создания</div>
                            <div>💡 Нажмите Escape для отмены</div>
                            <div>📝 Минимум 2 символа в названии</div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
