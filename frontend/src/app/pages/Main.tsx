import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WrapperMain, Content, Header, Form, FormInput, FormButton, FormError } from './Styles.styled';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

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
		} catch (err) {
			setError('Server error, please try again later');
		}
	};

	return (
		<WrapperMain>
			<Content>
				<Header>Deutschlandticket</Header>
				<Form>
					<FormInput
						type='text'
						placeholder='Ticketnummer eingeben'
						value={ticketNumber}
						onChange={(e) => setTicketNumber(e.target.value)}
            error={!!error}
					/>
					<FormButton
						onClick={handleSearch}
					>
						Suchen
					</FormButton>
				</Form>
        {error && <FormError>{error}</FormError>}
			</Content>
		</WrapperMain>
	);
};
