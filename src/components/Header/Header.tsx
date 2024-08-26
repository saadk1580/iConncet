import { ArrowIosBackOutline } from '@emotion-icons/evaicons-outline';
import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router';

const BackArrow = styled(ArrowIosBackOutline)({
  marginRight: '1em',
  cursor: 'pointer',
});

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid #333333',
  padding: '0.5em 0',
  width: '100%',
  '> img': {
    marginRight: '1em',
    borderRadius: '50%',
  },
});

export const Header = ({ children, arrow = true }: PropsWithChildren<{ arrow?: boolean }>) => {
  const navigate = useNavigate();

  return (
    <Container>
      {arrow && <BackArrow size={40} onClick={() => navigate('/chats')} />}
      {children}
    </Container>
  );
};
