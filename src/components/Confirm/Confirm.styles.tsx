import styled from '@emotion/styled';

export const Heading = styled.h3({
  margin: '10px',
});

export const List = styled.ul({
  listStyle: 'none',
  margin: '10px',
});

export const ListItem = styled.li({
  margin: '5px 0',
});

export const Buttons = styled.div({
  margin: '12px 10px',
});

export const Container = styled.div({
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  position: 'absolute',
  zIndex: '10',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: 0,
  left: 0,
  height: '100%',
});

export const ConfirmWindow = styled.div({
  // width: '100%',
  backgroundColor: '#ffffff',
  margin: '0 auto',
  position: 'relative',
  borderRadius: '10px',
  color: '#000000',
  padding: '10px',
});

export const Button = styled.button<{ bg: string }>(({ bg, color }) => ({
  padding: '10px',
  backgroundColor: bg,
  border: '1px solid #000000',
  cursor: 'pointer',
  borderRadius: '5px',
  marginRight: '10px',
  fontSize: '1rem',
  color,
}));
