// Utility function for combining class names (like shadcn's cn)
export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
