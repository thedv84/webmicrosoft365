import React from 'react';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'solid' | 'outline';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-base',
};

const variantClasses: Record<ButtonVariant, string> = {
  solid: 'bg-gray-900 text-white hover:bg-gray-800',
  outline: 'border border-current bg-transparent',
};

const merge = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' ');

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, size = 'md', variant = 'solid', className, children, ...props }, ref) => {
    const computed = merge(
      'inline-flex items-center justify-center rounded-lg font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed',
      sizeClasses[size],
      variantClasses[variant],
      className
    );

    if (asChild && React.isValidElement(children)) {
      // Apply button styles to child element (e.g., Link)
      const child = children as React.ReactElement<any>;
      return React.cloneElement(child, {
        className: merge((child.props as any)?.className, computed),
      });
    }

    return (
      <button ref={ref} className={computed} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

