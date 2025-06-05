import { useRef, useState } from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    required?: boolean;
    status?: 'default' | 'focus' | 'typing' | 'error' | 'success' | 'disabled';
    errorMessage?: string;
    icon?: React.ReactNode;
}

export const TextInput = ({
    label, required, status='default', errorMessage, icon, value, disabled, ...props
}: TextInputProps) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    const getStatus = () => {
        if (disabled) return 'border-[#DADADA] bg-[#F1F1F1] text-[#B4B4B4]';
        if (status === 'error') return 'border-[#F2597F]';
        if (status === 'success') return 'border-[#B4B4B4]';
        if (status === 'typing') return 'border-[#64B5F7]';
        if (isFocused) return 'border-[#64B5F7] ';
        return 'border-[#B4B4B4]';
    }

    return(
        <div className="flex flex-col gap-1 w-full">
            { label && (
                <label className="text-xs text-[#8C8C8C]">
                    {label}
                    {required && <span className="text-[#F2597F] ml-0.5">*</span>}
                </label>
            )}
            <div className={`
                    flex items-center p-2 rounded-sm border 
                    ${getStatus()} ${disabled ? 'cursor-not-allowed' : ''}
            ` }>
                { icon && icon }
                <input
                    ref={inputRef}
                    type="text"
                    className="outline-none ml-2 text-sm font-normal text-[#252525] placeholder:text-[#8C8C8C] disabled:cursor-not-allowed"
                    disabled={disabled}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    value={value}
                    {...props}
                />
            </div>
            { status === 'error' && errorMessage && (
                <p className="text-xs text-[#F2597F]">{errorMessage}</p>
            )}
        </div>
    )
}