import { ChangeEvent } from "react";

interface Props {
	label?: string;
	placeholder?: string;
	type: string;
	onchange: (e: ChangeEvent<HTMLInputElement>) => void;
	min?: number;
	checked?: boolean;
}

export default function InputBox({
	label,
	placeholder,
	type,
	onchange,
	min,
	checked,
}: Props) {
	return (
		<>
			<label htmlFor={label}>{label}</label>
			<input
				id={label}
				placeholder={placeholder}
				type={type}
				onChange={onchange}
				min={min === 5 ? 5 : undefined}
				defaultChecked={checked}
			/>
		</>
	);
}
