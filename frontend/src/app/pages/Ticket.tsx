import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { IconTime, IconPerson, IconList } from '../icons';
import ETicket from '../icons/ETicket_Logo.png';
import DTicket from '../icons/Icon_Deutschlandticket.png';
import STicket from '../icons/kvv_logo.jpg';
import { QRCodeSVG } from 'qrcode.react';
import styled, { keyframes } from 'styled-components';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const moveProgress = keyframes`
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  100% {
   -webkit-transform: translateX(calc(100vw - 200px));
    transform: translateX(calc(100vw - 200px));
  }
`;

const ProgressBar = styled.div`
  width: 100px;
  height: 6px;
  background: #007bff;
  border-radius: 3px;
  position: absolute;
  left: 0;
  will-change: transform;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  animation: ${moveProgress} 2s linear infinite alternate;
`;


export const Ticket = () => {
	const { ticketNumber } = useParams();
	const [ticketData, setTicketData] = useState<any>(null);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchTicket = async () => {
			setError('');
			setTicketData(null);

			try {
				console.log('Отправка запроса на:', `${baseUrl}/ticket/${ticketNumber}`);
				const response = await fetch(`${baseUrl}/ticket/${ticketNumber}`, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				});

				console.log('Статус ответа:', response.status);

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.error || 'Билет не найден');
				}

				const data = await response.json();
				console.log('Полученные данные:', data);
				setTicketData(data);
			} catch (err) {
				console.error('Ошибка при получении билета:', err);
				setError(err instanceof Error ? err.message : 'Ошибка при получении билета');
			}
		};

		if (ticketNumber) {
			fetchTicket();
		}
	}, [ticketNumber, baseUrl]);

	const formatDate = (dateString: string) => {
		const [year, month, day] = dateString.split('-');
		return `${day}.${month}.${year}`;
	};

	const styles = {
		wrapper: {
			background: '#C30A36',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			padding: '10px',
		},
		content: {
			maxWidth: '500px',
			width: '100%',
			display: 'flex',
			flexDirection: 'column' as const,
			border: '2px solid #cadaf3',
			borderRadius: '20px',
			flexGrow: 1,
			overflow: 'hidden',
			boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
		},
		header: {
			padding: '20px',
			fontWeight: 500,
			color: '#fff',
			fontSize: '20px',
			textAlign: 'center' as const,
			background: 'linear-gradient(90deg, #f26889, #C30A36)',
		},
		ticketItems: {
			background: '#f9fbfa',
			display: 'flex',
			flexDirection: 'column' as const,
			color: '#626b80',
		},
		logoSection: {
			display: 'flex',
			justifyContent: 'center',
			gap: '20px',
			padding: '20px',
		},
		logoImg: {
			height: '27px',
		},
		qrSection: {
			display: 'flex',
			justifyContent: 'center',
			width: '100%',
		},
		qrImage: {
			maxWidth: '100%',
			height: 'auto',
			width: 'auto',
			objectFit: 'contain' as const,
		},
		ticketSection: {
			padding: '20px',
			border: '1px solid #ebebeb',
			borderRadius: '8px',
			textAlign: 'center' as const,
			fontSize: '20px',
			color: '#333',
			fontWeight: 'bold',
			boxShadow:
				'rgba(14, 63, 126, 0.06) 0px 0px 0px 1px, rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 2px 2px -1px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.03) 0px 5px 5px -2.5px, rgba(42, 51, 70, 0.03) 0px 10px 10px -5px, rgba(42, 51, 70, 0.03) 0px 24px 24px -8px',
		},
		infoSection: {
			padding: '20px',
			display: 'flex',
			flexDirection: 'column' as const,
			gap: '5px',
			borderTop: '1.5px solid #e6e8e7',
		},
		rowSection: {
			display: 'flex',
			justifyContent: 'space-between',
			paddingLeft: '40px',
			position: 'relative' as const,
		},
		itemSection: {
			display: 'flex',
			alignItems: 'center',
		},
		logoBox: {
			position: 'absolute' as const,
			left: 0,
			width: '40px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
		logoBoxSvg: {
			height: '18px',
			width: '18px',
		},
		progressBarContainer: {
			width: '100%', 
			height: '6px',
			background: '#ccc',
			borderRadius: '3px',
			overflow: 'hidden',
			marginTop: '10px',
			position: 'relative' as const,
		},
	};

	return (
		<div style={styles.wrapper}>
			<div style={styles.content}>
				<h4 style={styles.header}>Deutschlandticket</h4>
				{ticketData && (
					<div style={styles.ticketItems}>
						<div
							style={{
								background: '#fff',
								padding: '20px',
								display: 'flex',
								flexDirection: 'column',
								gap: '20px',
							}}
						>
							<div style={styles.logoSection}>
								<img src={ETicket} alt='ETicket Logo' style={styles.logoImg} />
								<img src={DTicket} alt='Deutschlandticket Logo' style={styles.logoImg} />
								<img src={STicket} alt='Kvv Logo' style={styles.logoImg} />
							</div>
							<div style={styles.qrSection}>
								{ticketData.Image && (
									<img
										src={ticketData.Image}
										alt={`Ticket ${ticketData.Number}`}
										style={styles.qrImage}
									/>
								)}
							</div>
							<div style={styles.ticketSection}>
								{ticketData.Number}
								<div style={styles.progressBarContainer}>
									<div className="progress-bar" />
								</div>
							</div>
						</div>
						<div style={styles.infoSection}>
							<div style={styles.rowSection}>
								<div style={styles.itemSection}>
									<div style={styles.logoBox}>
										<IconTime />
									</div>
									Gültig von
								</div>
								<div style={{ ...styles.itemSection, fontWeight: 'bold', color: '#000' }}>
									{ticketData.StartDate} - {ticketData.StartTime}
								</div>
							</div>

							<div style={styles.rowSection}>
								<div style={styles.itemSection}>Gültig bis</div>
								<div style={{ ...styles.itemSection, fontWeight: 'bold', color: '#000' }}>
									{ticketData.EndDate} - {ticketData.EndTime}
								</div>
							</div>

							<div style={styles.rowSection}>
								<div style={styles.itemSection}>Geltungsbereich</div>
								<div style={{ ...styles.itemSection, fontWeight: 'bold', color: '#000' }}>
									Deutschlandweit
								</div>
							</div>

							<div style={styles.rowSection}>
								<div style={styles.itemSection}>Klasse</div>
								<div style={{ ...styles.itemSection, fontWeight: 'bold', color: '#000' }}>
									2. Klasse
								</div>
							</div>
						</div>

						<div style={styles.infoSection}>
							<div style={styles.rowSection}>
								<div style={styles.itemSection}>
									<div style={styles.logoBox}>
										<IconPerson />
									</div>
									Ticketinhaber*in
								</div>
								<div style={{ ...styles.itemSection, fontWeight: 'bold', color: '#000' }}>
									{ticketData.Name}
								</div>
							</div>

							<div style={styles.rowSection}>
								<div style={styles.itemSection}>
									<div style={styles.logoBox}>
										<IconList />
									</div>
									Geburtsdatum
								</div>
								<div style={{ ...styles.itemSection, fontWeight: 'bold', color: '#000' }}>
									{ticketData.BirthDate}
								</div>
							</div>
						</div>
						<div style={styles.infoSection}>
							Deutschlandweit gültig für eine Person in allen Nahverkehrsmitteln
							(ÖPNV/SPNV), 2. Klasse.
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
