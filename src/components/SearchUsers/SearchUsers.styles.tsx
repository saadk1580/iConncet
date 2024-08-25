import styled from "@emotion/styled";

export const Container = styled.div({
    padding: '1em',
  minWidth: "300px",
  backgroundColor: "#181a1b",

  "> input": {
    padding: "0.5rem",
    borderRadius: "10px",
    margin: "1rem",
    width: "15vw",
  },
});

export const List = styled.ul({
    margin: '10px 0',
    listStyle: 'none'
})


export const ListItem = styled.li({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: '20px',
    marginBottom: '10px'
})

