import styled from "@emotion/styled";

export const Container = styled.div({
  margin: "15px 0",
});

export const List = styled.ul({
  margin: "15px 0",
  listStyle: "none",
});

export const ListItem = styled.li({
  display: "flex",
  backgroundColor: "#333333",
  padding: "10px",
  border: "1px solid black",
  alignItems: "center",
});

export const Right = styled.div({
  marginLeft: "15px",
});

export const Img = styled.img({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
});

export const Name = styled.p({
  fontSize: "1.2rem",
  margin: "0 0 5px 0",
});

export const ResponseBtns = styled.div({
  display: "flex",
  "> *": {
    marginRight: "10px",
  },
});
