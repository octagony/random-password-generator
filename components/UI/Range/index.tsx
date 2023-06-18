import { SyntheticEvent } from 'react'
import style from './Range.module.css'
import { IRange } from './Range.props'

const Range = ({ passwordLength, handlePasswordLength }: IRange) => {
	return (
		<label className={style.wrapper}>
			<input
				type='range'
				name='length'
				onChange={(event: SyntheticEvent) => {
					handlePasswordLength(event)
				}}
				min='10'
				max='80'
				value={passwordLength}
				className={style.input}
			/>
		</label>
	)
}

export default Range
