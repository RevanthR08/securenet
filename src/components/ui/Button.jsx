import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import './Button.css';

const buttonVariants = cva('btn', {
    variants: {
        variant: {
            default: 'btn-default',
            ghost: 'btn-ghost',
            outline: 'btn-outline',
            secondary: 'btn-secondary',
            destructive: 'btn-destructive',
            link: 'btn-link',
        },
        size: {
            default: 'btn-size-default',
            sm: 'btn-size-sm',
            lg: 'btn-size-lg',
            icon: 'btn-size-icon',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

export const Button = forwardRef(({
    className,
    variant,
    size,
    asChild = false,
    ...props
}, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    );
});

Button.displayName = 'Button';
