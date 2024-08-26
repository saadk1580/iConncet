import styled from '@emotion/styled';

export const Title = styled.h1({
  borderBottom: '1px solid #333333',
  paddingBottom: '0.4em',
});

export const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: '1',
});

export const Chats = styled.div({
  display: 'flex',
  margin: '15px 0',
  lineHeight: '1.5em',
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
