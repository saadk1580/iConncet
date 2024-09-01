import styled from '@emotion/styled';

export const Container = styled.div({
  margin: '15px 0',
  width: '100%',
});

export const List = styled.ul({
  margin: '15px 0',
  listStyle: 'none',
});

export const ListItem = styled.li({
  display: 'flex',
  border: '1px solid black',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const Right = styled.div({
  display: 'flex',
  alignItems: 'center',
  '> p': {
    marginLeft: '10px',
  },
});

export const Img = styled.img({
  width: '30px',
  height: '30px',
  borderRadius: '50%',
});

export const ResponseBtns = styled.div({
  display: 'flex',
  '> *': {
    marginLeft: '10px',
  },
});

export const Button = styled.div(({ role }) => ({
  backgroundColor: role === 'accept' ? 'white' : 'darkGray',
  width: 'fit-content',
  padding: '5px 8px',
  borderRadius: '5px',
  color: 'black',
}));
