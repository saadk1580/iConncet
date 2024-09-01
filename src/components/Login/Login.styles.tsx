import styled from '@emotion/styled';

export const MiddleContainer = styled.div({
	backgroundColor: '#ffffff',
	height: '95dvh',
	width: '340px',
	maxHeight: '700px',
	maxWidth: '340px',
	borderRadius: '1em',
	color: '#000000',
});

export const Container = styled.div({
	display: 'flex',
	backgroundColor: '#00417D',
	height: '100vh',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	color: '#ffffff',
	fontFamily: '"Open Sans", sans-serif',
});

export const ImgIcon = styled.img({
	marginRight: '15px',
});

export const LoginBtn = styled.button({
	display: 'flex',
	fontSize: '1.2rem',
	padding: '10px 20px',
	borderRadius: '2px',
	border: 'none',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: 'white',
	cursor: 'pointer',
});

export const Heading = styled.p({
	backgroundColor: '#EDEDED',
	fontSize: '1.3rem',
	marginBottom: '20px',
	margin: '20px',
	maxWidth: '300px',
	padding: '10px 10px 10px 15px',
	borderRadius: '15px 15px 15px 0',
});
