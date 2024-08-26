import styled from '@emotion/styled';

export const Container = styled.div({
  display: 'flex',
  fontFamily: '"Poppins", sans-serif',
  color: '#ffffff',
  minWidth: '100vw',
  minHeight: '100vh',
  backgroundColor: '#000000',
  justifyContent: 'center',
});

export const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '500px',
  padding: '1rem',
  borderLeft: '0px solid #ffffff',
  height: '100vh',
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
  padding: '8px 0',
  fontSize: '1rem',
  margin: '5px 0',
});

export const DeleteButton = styled.button({
  padding: '8px 0',
  fontSize: '1rem',
});
