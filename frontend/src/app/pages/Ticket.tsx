import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IconPerson, IconList } from '../icons';
import LogoDTicket from '../icons/IMG_1562.jpg';
import LogoETicket from '../icons/IMG_1563.jpg';
import LogoRegional from '../icons/IMG_1564.jpg';
import { baseUrl } from '../api';
import {
	WrapperMain,
	Content,
	Header,
	TicketItems,
	TicketCardBody,
	LogoSection,
	LogoStripItem,
	QRFrame,
	QRSection,
	TicketNumberBlock,
	ProgressTrack,
	ProgressBar,
	InfoSection,
	DetailGrid,
	DetailCell,
	DetailLabel,
	DetailValue,
	RowSection,
	ItemSection,
	ItemValue,
	LogoBox,
	FooterNote,
	FormError,
	LoadingMessage,
} from './Styles.styled';

type TicketData = {
	Number: string | number;
	Name: string;
	BirthDate: string;
	StartDate: string;
	StartTime: string;
	EndDate: string;
	EndTime: string;
	Image?: string;
};

export const Ticket = () => {
	const { ticketNumber } = useParams();
	const [ticketData, setTicketData] = useState<TicketData | null>(null);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTicket = async () => {
			if (!ticketNumber) return;

			setError('');
			setTicketData(null);
			setLoading(true);

			try {
				const response = await fetch(`${baseUrl}/ticket/${ticketNumber}`, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.error || 'Билет не найден');
				}

				const data: TicketData = await response.json();
				setTicketData(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Ошибка при получении билета');
			} finally {
				setLoading(false);
			}
		};

		fetchTicket();
	}, [ticketNumber]);

	return (
		<WrapperMain>
			<Content>
				<Header>Deutschlandticket</Header>
				{loading && <LoadingMessage>Laden…</LoadingMessage>}
				{error && !loading && <FormError>{error}</FormError>}
				{ticketData && !loading && (
					<TicketItems>
						<TicketCardBody>
							<LogoSection>
								<LogoStripItem>
									<img src={LogoETicket} alt='ETicket Logo' />
								</LogoStripItem>
								<LogoStripItem>
									<img src={LogoDTicket} alt='Deutschlandticket Logo' />
								</LogoStripItem>
								<LogoStripItem>
									<img src={LogoRegional} alt='KVV Logo' />
								</LogoStripItem>
							</LogoSection>
							{ticketData.Image && (
								<QRFrame>
									<QRSection>
										<img src={ticketData.Image} alt={`Ticket ${ticketData.Number}`} />
									</QRSection>
								</QRFrame>
							)}
							<TicketNumberBlock>
								{ticketData.Number}
								<ProgressTrack>
									<ProgressBar />
								</ProgressTrack>
							</TicketNumberBlock>
						</TicketCardBody>
						<InfoSection>
							<DetailGrid>
								<DetailCell>
									<DetailLabel>Gültig von</DetailLabel>
									<DetailValue>
										{ticketData.StartDate} · {ticketData.StartTime}
									</DetailValue>
								</DetailCell>
								<DetailCell>
									<DetailLabel>Gültig bis</DetailLabel>
									<DetailValue>
										{ticketData.EndDate} · {ticketData.EndTime}
									</DetailValue>
								</DetailCell>
								<DetailCell>
									<DetailLabel>Geltungsbereich</DetailLabel>
									<DetailValue>Deutschlandweit</DetailValue>
								</DetailCell>
								<DetailCell>
									<DetailLabel>Klasse</DetailLabel>
									<DetailValue>2. Klasse</DetailValue>
								</DetailCell>
							</DetailGrid>
						</InfoSection>
						<InfoSection>
							<RowSection>
								<ItemSection>
									<LogoBox>
										<IconPerson />
									</LogoBox>
									Ticketinhaber*in
								</ItemSection>
								<ItemValue>{ticketData.Name}</ItemValue>
							</RowSection>
							<RowSection>
								<ItemSection>
									<LogoBox>
										<IconList />
									</LogoBox>
									Geburtsdatum
								</ItemSection>
								<ItemValue>{ticketData.BirthDate}</ItemValue>
							</RowSection>
						</InfoSection>
						<FooterNote>
							Deutschlandweit gültig für eine Person in allen Nahverkehrsmitteln (ÖPNV/SPNV), 2.
							Klasse.
						</FooterNote>
					</TicketItems>
				)}
			</Content>
		</WrapperMain>
	);
};
