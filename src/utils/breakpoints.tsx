import styled from '@emotion/styled';

const breakpoints = [576, 768, 992, 1200];

export const mq = (styles: { [key: string]: string[] }) => {
  let queryString = '';

  Object.keys(styles).forEach((property) => {
    const values = styles[property];
    values.forEach((value, index) => {
      const mediaQuery = `@media (min-width: ${breakpoints[index]}px)`;
      queryString += `${mediaQuery} { ${property}: ${value}; }`;
    });
  });

  return queryString;
};