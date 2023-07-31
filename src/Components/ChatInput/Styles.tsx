import styled from "@emotion/styled";

export const Container = styled.div({
  display: "flex",
  position: "fixed",
  flexDirection: "column",
  bottom: 0,
  width: "50vw",
  paddingBottom: "5px",
  backgroundColor: "#101112",
});

export const Icons = styled.div({
  display: "flex",
  alignItems: "center",
  width: "45vw",
  '> p': {
    fontSize: "1.2rem", cursor: "pointer"
  }
});

export const InputContainter = styled.div({
    display: 'flex',
    backgroundColor: '#101112',
    width: '50vw',
    justifyContent: 'center',
    
})
