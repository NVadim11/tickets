import { useState } from 'react';
import {
	WrapperMain,
	Content,
	Header,
	Form,
	FormInput,
	FormButton,
} from './Styles.styled';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const Admin = () => {
	const [formData, setFormData] = useState({
		Number: '',
		Name: '',
		BirthDate: '',
		StartDate: '',
		StartTime: '',
		EndDate: '',
		EndTime: '',
		QRCode: '',
	});

	const [imageFile, setImageFile] = useState<File | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let { name, value } = e.target;

		// Маска для даты (DD.MM.YYYY)
		if (name.includes('Date')) {
			value = value
				.replace(/\D/g, '') // Удаляем все нецифровые символы
				.replace(/^(\d{2})(\d)/, '$1.$2') // Добавляем точку после дня
				.replace(/^(\d{2}\.\d{2})(\d)/, '$1.$2') // Добавляем точку после месяца
				.replace(/\.(\d{4})\d+?$/, '.$1'); // Ограничиваем год 4 цифрами
			
			// Ограничиваем ввод невалидных значений
			const [day, month, year] = value.split('.');
			if (day && parseInt(day) > 31) value = '31' + value.slice(2);
			if (month && parseInt(month) > 12) value = value.slice(0, 3) + '12' + value.slice(5);
		}

		// Маска для времени (HH:MM)
		if (name.includes('Time')) {
			value = value
				.replace(/\D/g, '') // Удаляем все нецифровые символы
				.replace(/^(\d{2})(\d)/, '$1:$2') // Добавляем двоеточие после часов
				.replace(/:\d{2}\d+?$/, m => m.slice(0, 3)); // Ограничиваем минуты 2 цифрами
			
			// Ограничиваем ввод невалидных значений
			const [hours, minutes] = value.split(':');
			if (hours && parseInt(hours) > 23) value = '23' + value.slice(2);
			if (minutes && parseInt(minutes) > 59) value = value.slice(0, 3) + '59';
		}

		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			setImageFile(e.target.files[0]);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			let imagePath = '';
			if (imageFile) {
				const formData = new FormData();
				formData.append('image', imageFile);

				const uploadResponse = await fetch(`${baseUrl}/upload`, {
					method: 'POST',
					body: formData,
				});
				const uploadResult = await uploadResponse.json();

				if (!uploadResponse.ok) throw new Error(uploadResult.error || 'Ошибка загрузки изображения');

				imagePath = uploadResult.filePath;
			}
			const response = await fetch(`${baseUrl}/admin/tickets`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...formData, Image: imagePath }),
			});

			const result = await response.json();
			alert(result.message || 'Error adding ticket');
		} catch (error) {
			console.error('Request error:', error);
			alert('Failed to add ticket');
		}
	};

	const handleDeleteAllTickets = async () => {
		if (window.confirm('Вы уверены, что хотите удалить ВСЕ билеты? Это действие нельзя отменить.')) {
			try {
				const response = await fetch(`${baseUrl}/admin/tickets`, {
					method: 'DELETE',
				});
				
				const result = await response.json();
				alert(result.message);
			} catch (error) {
				console.error('Error deleting tickets:', error);
				alert('Ошибка при удалении билетов');
			}
		}
	};

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
					<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '16px' }}>
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
							placeholder='Время начала (ЧЧ:ММ)'
							value={formData.StartTime}
							onChange={handleChange}
							required
							maxLength={5}
						/>
					</div>
					<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '16px' }}>
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
							placeholder='Время окончания (ЧЧ:ММ)'
							value={formData.EndTime}
							onChange={handleChange}
							required
							maxLength={5}
						/>
					</div>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<label htmlFor='Image'>Изображение</label>
						<input type='file' name='Image' accept='image/png, image/jpeg, image/webp' onChange={handleFileChange} />
					</div>

					
					<div style={{display:'flex', gap: '20px'}}>
					<FormButton type='submit'>Добавить</FormButton>
					<FormButton 
						type='button' 
						onClick={handleDeleteAllTickets}
						style={{ 
							backgroundColor: '#dc3545',
						}}
					>
						Удалить все билеты
					</FormButton>
					</div>
				</Form>
				

			</Content>
		</WrapperMain>
	);
};
