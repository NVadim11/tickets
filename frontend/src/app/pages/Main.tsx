import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	WrapperMain,
	Content,
	Header,
	Form,
	FormInput,
	FormButton,
	FormError,
	PageIntro,
	PageTitle,
	PageSubtitle,
	SearchRow,
} from './Styles.styled';
import { baseUrl } from '../api';

export const Main = () => {
	const [ticketNumber, setTicketNumber] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		if (!ticketNumber.trim()) return;

		try {
			const response = await fetch(`${baseUrl}/api/check-ticket`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ticketNumber }),
			});

			const data = await response.json();

			if (response.ok && data.exists) {
				navigate(`/${ticketNumber}`);
			} else {
				setError('Ticket nicht gefunden');
			}
		} catch {
			setError('Server error, please try again later');
		}
	};

	return (
		<WrapperMain>
			<Content>
				<Header>Deutschlandticket</Header>
				<PageIntro>
					<PageTitle>Ticket anzeigen</PageTitle>
					<PageSubtitle>Geben Sie Ihre Ticketnummer ein, um Ihr eTicket zu öffnen.</PageSubtitle>
				</PageIntro>
				<Form onSubmit={handleSearch}>
					<SearchRow>
						<FormInput
							type='text'
							placeholder='Ticketnummer'
							value={ticketNumber}
							onChange={(e) => setTicketNumber(e.target.value)}
							$error={!!error}
							autoComplete='off'
						/>
						<FormButton type='submit'>Suchen</FormButton>
					</SearchRow>
				</Form>
				{error && <FormError>{error}</FormError>}
			</Content>
		</WrapperMain>
	);
};
