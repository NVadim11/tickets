import styled from 'styled-components';

export const Wrapper = styled.div`
	background: #C30A36;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px;
`;

export const WrapperMain = styled.div`
	background: #C30A36;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px;
    height: 100vh;
`;

export const Content = styled.div`
	max-width: 500px;
	width: 100%;
	display: flex;
	flex-direction: column;
	border: 2px solid #cadaf3;
	border-radius: 20px;
	flex-grow: 1;
	overflow: hidden;
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
`;

export const Header = styled.h4`
	padding: 20px;
	font-weight: 500;
	color: #fff;
	font-size: 20px;
	text-align: center;
background: linear-gradient(90deg, #f26889, #C30A36);
`;

export const Form = styled.form`
	background: #fff;
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	align-items: center;
`;

export const FormInput = styled.input<{ error?: boolean }>`
	padding: 12px;
	font-size: 16px;
	border: 1px solid ${({ error }) => (error ? 'red' : '#ccc')};
	border-radius: 20px;
	outline: none;
	width: 100%;
	transition: border-color 0.3s ease;

	&:focus {
		border-color: #f26889;
	}
`;

export const FormButton = styled.button`
	padding: 12px 20px;
	font-size: 16px;
	background: #C30A36;
	color: #fff;
	border: none;
	border-radius: 20px;
	cursor: pointer;
	transition: background 0.3s ease;
	width: 100%;
	max-width: 100px;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		background: #f26889;
	}
`;

export const FormError = styled.div`
	color: red;
	font-size: 14px;
	text-align: center;
	background: #fff;
	padding: 10px 0;
`;

export const TicketItems = styled.div`
	background: #f9fbfa;
	display: flex;
	flex-direction: column;
	color: #626b80;
`;

export const LogoSection = styled.div`
	display: flex;
	justify-content: center;
	gap: 20px;
    padding: 20px;
    justify-content: center;
    img {
        height: 27px;
    }
`;

export const QRSection = styled.div`
    display: flex;
    justify-content: center;
`;

export const TicketSection = styled.div`
	padding: 20px;
    border: 1px solid #ebebeb;
    border-radius: 8px;
    text-align: center;
    font-size: 20px;
    color: #333;
    font-weight: bold;
    box-shadow: rgba(14, 63, 126, 0.06) 0px 0px 0px 1px, rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 2px 2px -1px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.03) 0px 5px 5px -2.5px, rgba(42, 51, 70, 0.03) 0px 10px 10px -5px, rgba(42, 51, 70, 0.03) 0px 24px 24px -8px;
`;

export const InfoSection = styled.div`
	padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    border-top: 1.5px solid #e6e8e7;
`;

export const RowSection = styled.div`
    display: flex;
    justify-content: space-between;
    padding-left: 40px;
    position: relative;
`

export const ItemSection = styled.div`
    display: flex;
    align-items: center;
`

export const LogoBox = styled.div`
    position: absolute;
    left: 0;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        height: 18px;
        widht: 18px;
    }
`