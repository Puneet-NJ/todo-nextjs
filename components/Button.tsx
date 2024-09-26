export default function Button({
	label,
	onclick,
}: {
	label: string;
	onclick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
	return <button onClick={onclick}>{label}</button>;
}
