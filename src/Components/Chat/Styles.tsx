import styled from "@emotion/styled";

const lightGray = "#181a1b";

export const Container = styled.div({
  backgroundColor: "#101112",
  color: "#ccd3d5",
  display: "flex",
  fontFamily: '"Poppins", sans-serif',
  flexDirection: "column",
  padding: "60px 40px",
  width: "50vw",
  height: "100vh",
  overflow: "auto",
  scrollBehavior: "smooth",
  scrollMarginBottom: "20px",
  scrollMarginTop: "20px",
});

export const Image = styled.img({
  width: "200px",
  borderRadius: "10px",
  marginTop: "5px",
});

export const ProfileImg = styled.img({
  width: "20px",
  height: "20px",
  borderRadius: "50%",
});

export const MessageBox = styled.div({
  display: "flex",
});

export const Message = styled.p({
  display: "flex",
  flexDirection: "column",
  maxWidth: "30vw",
});

export const Date = styled.p({
  margin: "3px",
  fontWeight: "300",
  textAlign: "center",
});

export const Name = styled.p({
  margin: "2px",
  fontWeight: "300",
  fontSize: "0.8rem",
});

export const Text = styled.p({})

export const InnerContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

export const MessageContainer = styled.div(props => ({
  alignSelf: props.role === 'sent' ? 'flex-end' : '',
  backgroundColor: props.role === 'sent' ? 'rgb(0, 135, 224)' : '#333333',
  width: 'fit-content',
  padding: '5px 15px',
  borderRadius: props.role === 'sent' ? '15px 15px 0px 15px' : '15px 15px 15px 0px',
  margin: '0 3px',
  fontSize: '1rem',
}))

