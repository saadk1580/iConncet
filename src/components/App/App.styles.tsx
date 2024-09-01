import styled from '@emotion/styled';

export const Container = styled.div({
	display: 'flex',
	fontFamily: '"Open Sans", sans-serif',
	color: '#ffffff',
	backgroundColor: '#000000',
	justifyContent: 'center',
});

export const Content = styled.div({
	display: 'flex',
	flexDirection: 'column',
	maxWidth: '500px',
	padding: '1rem',
	borderLeft: '0px solid #ffffff',
	height: '100dvh',
	width: '100%',
});

export const MidContainer = styled.div({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	textAlign: 'center',
	minWidth: '500px',
	height: '100vh',
});

export const LogoutButton = styled.button({
	fontSize: '1rem',
	margin: '5px 0',
	cursor: 'pointer',
	border: 'none',
	backgroundColor: 'transparent',
	color: '#ffffff',
});

export const DeleteButton = styled.button({
	marginTop: '1em',
	padding: '8px 0',
	fontSize: '1rem',
});
