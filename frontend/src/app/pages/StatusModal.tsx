import { useEffect } from 'react';
import {
	ModalOverlay,
	ModalPanel,
	ModalTitle,
	ModalMessage,
	ModalButton,
} from './Styles.styled';

export type StatusModalState = {
	variant: 'success' | 'error';
	message: string;
} | null;

type Props = {
	state: StatusModalState;
	onClose: () => void;
};

export const StatusModal = ({ state, onClose }: Props) => {
	useEffect(() => {
		if (!state) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [state, onClose]);

	if (!state) return null;

	const title = state.variant === 'success' ? 'Да' : 'Нет';

	return (
		<ModalOverlay onClick={onClose} role='dialog' aria-modal='true' aria-labelledby='status-modal-title'>
			<ModalPanel $variant={state.variant} onClick={(e) => e.stopPropagation()}>
				<ModalTitle id='status-modal-title' $variant={state.variant}>
					{title}
				</ModalTitle>
				<ModalMessage>{state.message}</ModalMessage>
				<ModalButton type='button' onClick={onClose}>
					OK
				</ModalButton>
			</ModalPanel>
		</ModalOverlay>
	);
};
