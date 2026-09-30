import { useEffect, useState } from 'react';
import {
	WrapperMain,
	Content,
	Header,
	Form,
	FormInput,
	FormButton,
	FormError,
	FormSuccess,
	FormHint,
	FormLabel,
	FileInput,
	ButtonRow,
} from './Styles.styled';
import {
	adminLogin,
	authHeaders,
	baseUrl,
	clearAdminToken,
	getAdminToken,
} from '../api';

const emptyForm = {
	Number: '',
	Name: '',
	BirthDate: '',
	StartDate: '',
	StartTime: '',
	EndDate: '',
	EndTime: '',
};

export const Admin = () => {
	const [authenticated, setAuthenticated] = useState(false);
	const [password, setPassword] = useState('');
	const [loginError, setLoginError] = useState('');
	const [loginLoading, setLoginLoading] = useState(false);
	const [formData, setFormData] = useState(emptyForm);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [formError, setFormError] = useState('');
	const [formSuccess, setFormSuccess] = useState('');

	useEffect(() => {
		setAuthenticated(!!getAdminToken());
	}, []);

	const handleUnauthorized = () => {
		clearAdminToken();
		setAuthenticated(false);
		setFormError('Сессия истекла. Войдите снова.');
	};

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoginError('');
		setLoginLoading(true);

		try {
			await adminLogin(password);
			setPassword('');
			setAuthenticated(true);
		} catch (err) {
			setLoginError(err instanceof Error ? err.message : 'Ошибка входа');
		} finally {
			setLoginLoading(false);
		}
	};

	const handleLogout = () => {
		clearAdminToken();
		setAuthenticated(false);
		setFormSuccess('');
		setFormError('');
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let { name, value } = e.target;

		if (name.includes('Date')) {
			value = value
				.replace(/\D/g, '')
				.replace(/^(\d{2})(\d)/, '$1.$2')
				.replace(/^(\d{2}\.\d{2})(\d)/, '$1.$2')
				.replace(/\.(\d{4})\d+?$/, '.$1');

			const [day, month] = value.split('.');
			if (day && parseInt(day, 10) > 31) value = '31' + value.slice(2);
			if (month && parseInt(month, 10) > 12) value = value.slice(0, 3) + '12' + value.slice(5);
		}

		if (name.includes('Time')) {
			value = value
				.replace(/\D/g, '')
				.replace(/^(\d{2})(\d)/, '$1:$2')
				.replace(/:\d{2}\d+?$/, (m) => m.slice(0, 3));

			const [hours, minutes] = value.split(':');
			if (hours && parseInt(hours, 10) > 23) value = '23' + value.slice(2);
			if (minutes && parseInt(minutes, 10) > 59) value = value.slice(0, 3) + '59';
		}

		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			setImageFile(e.target.files[0]);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setFormError('');
		setFormSuccess('');

		try {
			let imagePath = '';
			if (imageFile) {
				const uploadBody = new FormData();
				uploadBody.append('image', imageFile);

				const uploadResponse = await fetch(`${baseUrl}/upload`, {
					method: 'POST',
					headers: authHeaders(),
					body: uploadBody,
				});
				const uploadResult = await uploadResponse.json();

				if (uploadResponse.status === 401) {
					handleUnauthorized();
					return;
				}
				if (!uploadResponse.ok) {
					throw new Error(uploadResult.error || 'Ошибка загрузки изображения');
				}

				imagePath = uploadResult.filePath;
			}

			if (!imagePath) {
				setFormError('Выберите изображение билета');
				return;
			}

			const response = await fetch(`${baseUrl}/admin/tickets`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', ...authHeaders() },
				body: JSON.stringify({ ...formData, Image: imagePath }),
			});

			const result = await response.json();

			if (response.status === 401) {
				handleUnauthorized();
				return;
			}
			if (!response.ok) {
				throw new Error(result.error || 'Ошибка сохранения');
			}

			setFormSuccess(result.message || 'Билет сохранён');
			setFormData(emptyForm);
			setImageFile(null);
		} catch (err) {
			setFormError(err instanceof Error ? err.message : 'Не удалось сохранить билет');
		}
	};

	const handleDeleteAllTickets = async () => {
		if (!window.confirm('Удалить все билеты? Это нельзя отменить.')) return;

		setFormError('');
		setFormSuccess('');

		try {
			const response = await fetch(`${baseUrl}/admin/tickets`, {
				method: 'DELETE',
				headers: authHeaders(),
			});

			const result = await response.json();

			if (response.status === 401) {
				handleUnauthorized();
				return;
			}
			if (!response.ok) {
				throw new Error(result.error || 'Ошибка удаления');
			}

			setFormSuccess(result.message);
		} catch (err) {
			setFormError(err instanceof Error ? err.message : 'Ошибка при удалении');
		}
	};

	if (!authenticated) {
		return (
			<WrapperMain>
				<Content>
					<Header>Админка</Header>
					<Form onSubmit={handleLogin}>
						<FormHint>Введите пароль для доступа к управлению билетами.</FormHint>
						<FormInput
							type='password'
							name='password'
							placeholder='Пароль'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							$error={!!loginError}
							autoComplete='current-password'
							required
						/>
						<FormButton type='submit' disabled={loginLoading}>
							{loginLoading ? 'Вход…' : 'Войти'}
						</FormButton>
					</Form>
					{loginError && <FormError>{loginError}</FormError>}
				</Content>
			</WrapperMain>
		);
	}

	return (
		<WrapperMain>
			<Content>
				<Header>Добавить билет</Header>
				<Form onSubmit={handleSubmit}>
					<FormInput
						type='number'
						name='Number'
						placeholder='Номер'
						value={formData.Number}
						onChange={handleChange}
						required
					/>
					<FormInput
						type='text'
						name='Name'
						placeholder='Имя'
						value={formData.Name}
						onChange={handleChange}
						required
					/>
					<FormInput
						type='text'
						name='BirthDate'
						placeholder='Дата рождения (ДД.ММ.ГГГГ)'
						value={formData.BirthDate}
						onChange={handleChange}
						required
						maxLength={10}
					/>
					<ButtonRow>
						<FormInput
							type='text'
							name='StartDate'
							placeholder='Дата начала (ДД.ММ.ГГГГ)'
							value={formData.StartDate}
							onChange={handleChange}
							required
							maxLength={10}
						/>
						<FormInput
							type='text'
							name='StartTime'
							placeholder='Время (ЧЧ:ММ)'
							value={formData.StartTime}
							onChange={handleChange}
							required
							maxLength={5}
						/>
					</ButtonRow>
					<ButtonRow>
						<FormInput
							type='text'
							name='EndDate'
							placeholder='Дата окончания (ДД.ММ.ГГГГ)'
							value={formData.EndDate}
							onChange={handleChange}
							required
							maxLength={10}
						/>
						<FormInput
							type='text'
							name='EndTime'
							placeholder='Время (ЧЧ:ММ)'
							value={formData.EndTime}
							onChange={handleChange}
							required
							maxLength={5}
						/>
					</ButtonRow>
					<FormLabel>
						Изображение
						<FileInput
							type='file'
							name='Image'
							accept='image/png, image/jpeg, image/webp'
							onChange={handleFileChange}
							required
						/>
					</FormLabel>
					<ButtonRow>
						<FormButton type='submit'>Добавить</FormButton>
						<FormButton type='button' $variant='danger' onClick={handleDeleteAllTickets}>
							Удалить все
						</FormButton>
					</ButtonRow>
					<FormButton type='button' $variant='ghost' onClick={handleLogout}>
						Выйти
					</FormButton>
				</Form>
				{formError && <FormError>{formError}</FormError>}
				{formSuccess && <FormSuccess>{formSuccess}</FormSuccess>}
			</Content>
		</WrapperMain>
	);
};
