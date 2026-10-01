import styled, { keyframes } from 'styled-components';

/** Night / premium theme (variant B) */
export const theme = {
	pageBg: 'linear-gradient(165deg, #1a1f2e 0%, #121824 45%, #0a0e14 100%)',
	card: '#1e2633',
	cardInner: '#252d3d',
	border: 'rgba(255, 255, 255, 0.1)',
	borderFocus: 'rgba(255, 193, 7, 0.45)',
	text: '#e8eaed',
	textMuted: '#9aa3b2',
	textHeading: '#ffffff',
	accent: '#ffc107',
	accentHover: '#ffcd38',
	accentGlow: 'rgba(255, 193, 7, 0.22)',
	danger: '#ff6b6b',
	dangerHover: '#ff5252',
	inputBg: '#141a24',
	shadow: '0 16px 48px rgba(0, 0, 0, 0.45)',
	radiusLg: '20px',
	radiusMd: '12px',
	radiusSm: '8px',
};

/** Full-page shell: scroll lives on document (html), not trapped in flex. */
export const WrapperMain = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	min-height: 100svh;
	min-height: 100vh;
	flex-shrink: 0;
	box-sizing: border-box;
	background: ${theme.pageBg};
	background-attachment: fixed;
	padding:
		max(clamp(6px, 1.5svh, 16px), env(safe-area-inset-top, 0px))
		clamp(10px, 2.5vw, 20px)
		max(clamp(12px, 2.5svh, 24px), env(safe-area-inset-bottom, 0px));
`;

export const Content = styled.div`
	width: min(100%, 27.5rem);
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	background: ${theme.card};
	border: 1px solid ${theme.border};
	border-radius: clamp(12px, 2.5svh, ${theme.radiusLg});
	box-shadow: ${theme.shadow};
	overflow: clip;

	@supports not (overflow: clip) {
		overflow: hidden;
	}
`;

export const Header = styled.h4`
	padding: clamp(12px, 2.2svh, 22px) clamp(14px, 3vw, 20px);
	font-weight: 600;
	color: ${theme.textHeading};
	font-size: clamp(1rem, 0.6rem + 1.8svh, 1.25rem);
	text-align: center;
	letter-spacing: 0.02em;
	background: ${theme.cardInner};
	border-bottom: 3px solid ${theme.accent};
`;

export const PageIntro = styled.div`
	padding: 20px 20px 0;
	background: ${theme.card};
`;

export const PageTitle = styled.h1`
	font-size: 1.35rem;
	font-weight: 600;
	color: ${theme.textHeading};
	margin: 0 0 6px;
`;

export const PageSubtitle = styled.p`
	margin: 0;
	font-size: 0.95rem;
	color: ${theme.textMuted};
	line-height: 1.4;
`;

export const Form = styled.form`
	background: ${theme.card};
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 14px;
	align-items: stretch;
`;

export const SearchRow = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;

	@media (min-width: 480px) {
		flex-direction: row;
		align-items: stretch;

		& > input {
			flex: 1;
		}

		& > button {
			flex: 0 0 auto;
			min-width: 120px;
		}
	}
`;

export const FormInput = styled.input<{ $error?: boolean }>`
	padding: 14px 16px;
	font-size: 16px;
	color: ${theme.text};
	background: ${theme.inputBg};
	border: 1px solid
		${({ $error }) => ($error ? theme.danger : theme.border)};
	border-radius: ${theme.radiusMd};
	outline: none;
	width: 100%;
	transition: border-color 0.2s ease, box-shadow 0.2s ease;

	&::placeholder {
		color: ${theme.textMuted};
	}

	&:focus {
		border-color: ${theme.borderFocus};
		box-shadow: 0 0 0 3px ${theme.accentGlow};
	}
`;

export const FormButton = styled.button<{ $variant?: 'primary' | 'danger' | 'ghost' }>`
	padding: 14px 20px;
	font-size: 16px;
	font-weight: 600;
	background: ${({ $variant }) =>
		$variant === 'danger'
			? theme.danger
			: $variant === 'ghost'
				? 'transparent'
				: theme.accent};
	color: ${({ $variant }) =>
		$variant === 'ghost' ? theme.accent : $variant === 'primary' || !$variant ? '#1a1f2e' : '#fff'};
	border: ${({ $variant }) =>
		$variant === 'ghost' ? `1px solid ${theme.accent}` : 'none'};
	border-radius: ${theme.radiusMd};
	cursor: pointer;
	transition: background 0.2s ease, transform 0.15s ease, opacity 0.2s ease;
	flex: 1;
	min-width: 0;

	&:hover {
		background: ${({ $variant }) =>
			$variant === 'danger'
				? theme.dangerHover
				: $variant === 'ghost'
					? theme.accentGlow
					: theme.accentHover};
	}

	&:active {
		transform: scale(0.98);
	}

	&:disabled {
		opacity: 0.55;
		cursor: not-allowed;
	}
`;

export const FormError = styled.div`
	color: ${theme.danger};
	font-size: 14px;
	text-align: center;
	background: ${theme.card};
	padding: 0 20px 18px;
`;

export const FormSuccess = styled(FormError)`
	color: #7bed9f;
`;

export const ModalOverlay = styled.div`
	position: fixed;
	inset: 0;
	z-index: 1000;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: max(16px, env(safe-area-inset-top)) 16px max(16px, env(safe-area-inset-bottom));
	background: rgba(0, 0, 0, 0.65);
	backdrop-filter: blur(4px);
`;

export const ModalPanel = styled.div<{ $variant: 'success' | 'error' }>`
	width: min(100%, 22rem);
	padding: clamp(20px, 4vw, 28px);
	border-radius: ${theme.radiusLg};
	background: ${theme.cardInner};
	border: 2px solid
		${({ $variant }) => ($variant === 'success' ? '#7bed9f' : theme.danger)};
	box-shadow:
		0 24px 64px rgba(0, 0, 0, 0.5),
		0 0 0 1px ${theme.border},
		${({ $variant }) =>
			$variant === 'success'
				? '0 0 32px rgba(123, 237, 159, 0.25)'
				: '0 0 32px rgba(255, 107, 107, 0.25)'};
	text-align: center;
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

export const ModalTitle = styled.p<{ $variant: 'success' | 'error' }>`
	margin: 0;
	font-size: 1.125rem;
	font-weight: 700;
	color: ${({ $variant }) => ($variant === 'success' ? '#7bed9f' : theme.danger)};
	letter-spacing: 0.02em;
`;

export const ModalMessage = styled.p`
	margin: 0;
	font-size: 15px;
	line-height: 1.45;
	color: ${theme.text};
`;

export const ModalButton = styled(FormButton)`
	width: 100%;
	margin-top: 4px;
`;

export const FormHint = styled.p`
	font-size: 14px;
	color: ${theme.textMuted};
	text-align: center;
	margin: 0;
	padding: 0 20px;
`;

export const FormLabel = styled.label`
	font-size: 14px;
	font-weight: 600;
	color: ${theme.textMuted};
	display: flex;
	flex-direction: column;
	gap: 8px;
	width: 100%;
`;

export const FileInput = styled.input`
	font-size: 14px;
	padding: 8px 0;
	color: ${theme.text};
`;

export const ButtonRow = styled.div`
	display: flex;
	gap: 12px;
	width: 100%;
	flex-wrap: wrap;
`;

export const TicketItems = styled.div`
	display: flex;
	flex-direction: column;
	color: ${theme.textMuted};
	background: ${theme.card};
	--ticket-scale: clamp(0.78, calc(100svh / 720), 1);
`;

export const TicketCardBody = styled.div`
	padding: clamp(10px, 2.2svh, 20px) clamp(12px, 3vw, 20px);
	display: flex;
	flex-direction: column;
	gap: clamp(8px, 1.6svh, 16px);
`;

export const LogoSection = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: clamp(8px, 2vw, 16px);
	flex-wrap: wrap;
	padding: clamp(4px, 0.8svh, 8px) 0;

	img {
		height: clamp(18px, 3.2svh, 28px);
		width: auto;
		filter: brightness(1.15) contrast(0.95);
	}
`;

export const QRFrame = styled.div`
	padding: clamp(6px, 1.2svh, 12px);
	background: ${theme.cardInner};
	border-radius: ${theme.radiusMd};
	border: 1px solid ${theme.border};
	box-shadow: 0 0 28px ${theme.accentGlow};
`;

export const QRSection = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;

	img {
		max-width: 100%;
		width: auto;
		height: auto;
		max-height: clamp(96px, 34svh, 280px);
		object-fit: contain;
		border-radius: ${theme.radiusSm};
	}
`;

export const TicketNumberBlock = styled.div`
	padding: clamp(10px, 1.8svh, 18px) clamp(12px, 3vw, 18px);
	background: ${theme.inputBg};
	border: 1px solid ${theme.border};
	border-radius: ${theme.radiusMd};
	text-align: center;
	font-size: clamp(1rem, 0.5rem + 2.2svh, 1.5rem);
	font-weight: 700;
	color: ${theme.accent};
	letter-spacing: 0.06em;
`;

/** % in `left` is track width; translateX(%) would be bar width only (broken slide). */
const moveProgress = keyframes`
	0% {
		left: 0;
	}
	100% {
		left: calc(100% - var(--progress-bar-size, 100px));
	}
`;

export const ProgressTrack = styled.div`
	--progress-bar-size: clamp(56px, 28%, 100px);
	width: 100%;
	height: clamp(4px, 0.6svh, 6px);
	background: rgba(255, 255, 255, 0.08);
	border-radius: 3px;
	overflow: hidden;
	margin-top: clamp(8px, 1.4svh, 14px);
	position: relative;
`;

export const ProgressBar = styled.div`
	width: var(--progress-bar-size);
	height: 100%;
	background: ${theme.accent};
	border-radius: 3px;
	position: absolute;
	top: 0;
	left: 0;
	box-shadow: 0 0 12px ${theme.accentGlow};
	will-change: left;
	animation: ${moveProgress} 2s linear infinite alternate;
`;

export const InfoSection = styled.div`
	padding: clamp(10px, 1.8svh, 16px) clamp(12px, 3vw, 20px);
	display: flex;
	flex-direction: column;
	gap: clamp(6px, 1svh, 10px);
	border-top: 1px solid ${theme.border};
	font-size: clamp(0.8125rem, 0.7rem + 0.35svh, 0.9375rem);
`;

export const DetailGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 9.5rem), 1fr));
	gap: clamp(6px, 1svh, 10px);
`;

export const DetailCell = styled.div`
	background: ${theme.inputBg};
	border: 1px solid ${theme.border};
	border-radius: ${theme.radiusSm};
	padding: clamp(8px, 1.2svh, 12px) clamp(10px, 2vw, 14px);
	display: flex;
	flex-direction: column;
	gap: clamp(2px, 0.4svh, 4px);
	min-width: 0;
`;

export const DetailLabel = styled.span`
	font-size: clamp(0.625rem, 0.5rem + 0.35svh, 0.75rem);
	text-transform: uppercase;
	letter-spacing: 0.04em;
	color: ${theme.textMuted};
`;

export const DetailValue = styled.span`
	font-size: clamp(0.8125rem, 0.65rem + 0.45svh, 0.9375rem);
	font-weight: 600;
	color: ${theme.text};
	word-break: break-word;
`;

export const RowSection = styled.div`
	display: flex;
	justify-content: space-between;
	gap: clamp(8px, 2vw, 12px);
	padding-left: clamp(28px, 8vw, 36px);
	position: relative;
	align-items: flex-start;
`;

export const ItemSection = styled.div`
	display: flex;
	align-items: center;
	color: ${theme.textMuted};
`;

export const ItemValue = styled(ItemSection)`
	font-weight: 600;
	color: ${theme.text};
	text-align: right;
	flex: 1;
	justify-content: flex-end;
`;

export const LogoBox = styled.div`
	position: absolute;
	left: 0;
	width: clamp(28px, 8vw, 36px);
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${theme.accent};

	svg {
		width: clamp(14px, 2.2svh, 18px);
		height: clamp(14px, 2.2svh, 18px);
	}

	svg path {
		fill: currentColor;
	}
`;

export const FooterNote = styled(InfoSection)`
	font-size: clamp(0.75rem, 0.6rem + 0.35svh, 0.8125rem);
	line-height: 1.45;
	color: ${theme.textMuted};
	background: ${theme.cardInner};
`;

export const LoadingMessage = styled.div`
	color: ${theme.textMuted};
	text-align: center;
	padding: 24px 20px;
	background: ${theme.card};
`;
