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

export const WrapperMain = styled.div`
	background: ${theme.pageBg};
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	min-height: 100dvh;
	min-height: 100svh;
	padding: max(12px, env(safe-area-inset-top, 0px)) 16px
		max(20px, env(safe-area-inset-bottom, 0px));
`;

export const Content = styled.div`
	max-width: 440px;
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	margin-top: auto;
	margin-bottom: auto;
	background: ${theme.card};
	border: 1px solid ${theme.border};
	border-radius: ${theme.radiusLg};
	overflow: hidden;
	box-shadow: ${theme.shadow};
`;

export const Header = styled.h4`
	padding: 22px 20px;
	font-weight: 600;
	color: ${theme.textHeading};
	font-size: 1.25rem;
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
`;

export const TicketCardBody = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 16px;

	@media (max-height: 700px) {
		padding: 14px 16px;
		gap: 12px;
	}
`;

export const LogoSection = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 16px;
	flex-wrap: wrap;
	padding: 8px 0;

	img {
		height: 28px;
		width: auto;
		filter: brightness(1.15) contrast(0.95);
	}
`;

export const QRFrame = styled.div`
	padding: 12px;
	background: ${theme.cardInner};
	border-radius: ${theme.radiusMd};
	border: 1px solid ${theme.border};
	box-shadow: 0 0 28px ${theme.accentGlow};

	@media (max-height: 700px) {
		padding: 8px;
	}
`;

export const QRSection = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;

	img {
		max-width: 100%;
		width: auto;
		height: auto;
		max-height: min(42dvh, 280px);
		object-fit: contain;
		border-radius: ${theme.radiusSm};

		@media (max-height: 700px) {
			max-height: min(32dvh, 220px);
		}
	}
`;

export const TicketNumberBlock = styled.div`
	padding: 18px;
	background: ${theme.inputBg};
	border: 1px solid ${theme.border};
	border-radius: ${theme.radiusMd};
	text-align: center;
	font-size: clamp(1.125rem, 4vw, 1.5rem);
	font-weight: 700;
	color: ${theme.accent};
	letter-spacing: 0.06em;

	@media (max-height: 700px) {
		padding: 12px 14px;
	}
`;

/** % in `left` is track width; translateX(%) would be bar width only (broken slide). */
const moveProgress = keyframes`
	0% {
		left: 0;
	}
	100% {
		left: calc(100% - 100px);
	}
`;

export const ProgressTrack = styled.div`
	width: 100%;
	height: 6px;
	background: rgba(255, 255, 255, 0.08);
	border-radius: 3px;
	overflow: hidden;
	margin-top: 14px;
	position: relative;
`;

export const ProgressBar = styled.div`
	width: 100px;
	height: 6px;
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
	padding: 16px 20px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	border-top: 1px solid ${theme.border};
	font-size: 0.9375rem;

	@media (max-height: 700px) {
		padding: 12px 16px;
		gap: 8px;
		font-size: 0.875rem;
	}
`;

export const DetailGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;

	@media (max-width: 380px) {
		grid-template-columns: 1fr;
	}
`;

export const DetailCell = styled.div`
	background: ${theme.inputBg};
	border: 1px solid ${theme.border};
	border-radius: ${theme.radiusSm};
	padding: 12px 14px;
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const DetailLabel = styled.span`
	font-size: 0.75rem;
	text-transform: uppercase;
	letter-spacing: 0.04em;
	color: ${theme.textMuted};
`;

export const DetailValue = styled.span`
	font-size: 0.9375rem;
	font-weight: 600;
	color: ${theme.text};
`;

export const RowSection = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 12px;
	padding-left: 36px;
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
	width: 36px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${theme.accent};

	svg path {
		fill: currentColor;
	}
`;

export const FooterNote = styled(InfoSection)`
	font-size: 0.8125rem;
	line-height: 1.5;
	color: ${theme.textMuted};
	background: ${theme.cardInner};
`;

export const LoadingMessage = styled.div`
	color: ${theme.textMuted};
	text-align: center;
	padding: 24px 20px;
	background: ${theme.card};
`;
