import styled from "@emotion/styled";

export const Container = styled.div({
  display: "flex",
  position: "absolute",
  left: 0,
  right: 0,
  flexDirection: "column",
  bottom: 0,
  paddingBottom: "5px",
  backgroundColor: "#101112",
});

export const Icons = styled.div({
  display: "flex",
  alignItems: "center",
  "> p": {
    fontSize: "1.2rem",
    cursor: "pointer",
  },
});

export const InputContainter = styled.div({
  display: "flex",
  backgroundColor: "#101112",
  justifyContent: "center",
});

export const ImgIngput = styled.input({
  // display: 'none'
})

export const ImageIconLabel = styled.label({
  margin:' 15.5px 12px 0 0',
  alignItems: 'center',
  ':hover' : {
    cursor: 'pointer',

  }
})