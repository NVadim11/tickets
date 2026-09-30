import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import GlobalStyle from './GlobalStyles';

export const App = () => {
	return (
		<>
			<GlobalStyle />
			<RouterProvider router={router} />
		</>
	);
};
