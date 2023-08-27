import styled from "@emotion/styled";

export const Container = styled.div({
  display: "flex",
  fontFamily: '"Poppins", sans-serif',
  color: "#ffffff",
  minWidth: '1200px',
  minHeight: '100vh'
});

export const LeftContainer = styled.div({
  minWidth: "380px",
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  backgroundColor: "#181a1b",
});

export const MidContainer = styled.div({
  backgroundColor: "#101112",
  minWidth: "100px",
  height: "100vh",
  position: "relative",
  flex: 1,
});

export const LogoutButton = styled.button({
  padding: '8px 0',
  fontSize: '1rem',
  margin: '5px 0'
})

export const DeleteButton = styled.button({
  padding: '8px 0',
  fontSize: '1rem'
})