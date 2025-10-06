type Props = {
	title: string
	callBack?: () => void
}

export const Button = ({ title, callBack }: Props) => {

	return (
		<button onClick={callBack}>{title}</button>
	)
}	