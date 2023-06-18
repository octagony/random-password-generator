import { SyntheticEvent } from 'react'
import { IPassword } from '../../types/state'
import { IAlertStatus } from '../AlertBox/AlertBox.props'

export interface IGenerator {
	handleGeneratePassword: () => void
	password: IPassword
	actionButtons: boolean
	handlePasswordLength: (event: SyntheticEvent) => void
	passwordLength: number
	updateCheckboxes: (event: SyntheticEvent) => void
	handleCopyToClipboard: (event: SyntheticEvent, password: string) => void
	setModalSave: React.Dispatch<React.SetStateAction<boolean>>
	setAlertStatus: React.Dispatch<React.SetStateAction<IAlertStatus>>
}
