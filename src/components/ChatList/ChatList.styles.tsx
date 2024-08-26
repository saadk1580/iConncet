import styled from '@emotion/styled';

export const Title = styled.h1({
  borderBottom: '1px solid #333333',
  paddingBottom: '0.4em',
});

export const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
});

export const Chats = styled.div({
  margin: '15px 0',
});

export const Chat = styled.div({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '0.5em',
  ':hover': {
    backgroundColor: '#333333',
  },
});

export const PorfileImg = styled.img({
  borderRadius: '50%',
});

export const DisplayName = styled.p({
  marginLeft: '1em',
});
