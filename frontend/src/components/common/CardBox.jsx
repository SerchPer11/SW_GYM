
export function CardBox({ children, className = "", variant = "raised" }) {
    const variants = {
         raised: `
            bg-white 
            rounded-2xl 
            p-6 
            border border-slate-100
            shadow-[0_4px_6px_rgba(0,0,0,0.04),0_10px_20px_rgba(0,0,0,0.06)]
        `,

        elevated: `
            bg-white 
            rounded-2xl 
            p-6 
            border border-slate-100
            shadow-[0_10px_30px_rgba(0,0,0,0.08),0_4px_10px_rgba(0,0,0,0.05)]
        `,

        floating: `
            bg-white 
            rounded-2xl 
            p-6 
            border border-slate-100
            shadow-[0_20px_40px_rgba(0,0,0,0.12)]
        `,

        pressed: `
            bg-slate-50/80 
            rounded-xl 
            p-4 
            shadow-[inset_4px_4px_10px_rgba(15,23,42,0.08),inset_-4px_-4px_10px_rgba(255,255,255,1)]
        `,
    };

    return (
        <div className={`${variants[variant] ?? variants.default} ${className}`.trim()}>
            {children}
        </div>
    );
}