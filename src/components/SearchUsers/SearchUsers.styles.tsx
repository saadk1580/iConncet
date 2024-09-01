import styled from '@emotion/styled';

export const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  '> input': {
    padding: '0.5rem',
    borderRadius: '10px',
    margin: '1rem',
    width: '15vw',
  },
});

export const List = styled.ul({
  margin: '10px 0',
  listStyle: 'none',
});

export const ListItem = styled.li({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: '20px',
  marginBottom: '10px',
});
