
export function CardBox({ children, className = "", variant = "raised" }) {
    const variants = {
        raised: "bg-white rounded-2xl shadow-sm border border-slate-200 p-6",
        pressed: "bg-slate-50/80 rounded-xl p-4 shadow-[inset_4px_4px_8px_rgba(15,23,42,0.06),inset_-4px_-4px_8px_rgba(255,255,255,1)]",
    };

    return (
        <div className={`${variants[variant] ?? variants.default} ${className}`.trim()}>
            {children}
        </div>
    );
}