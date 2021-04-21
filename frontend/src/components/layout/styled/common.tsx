import styled from 'styled-components';
import React from 'react';

export const Container = styled.div`
  border-radius: 16px;
  border: 1px solid #ceccca;
  background-color: #f5f0ee;
  width: fit-content;
  padding: 24px 24px 48px 24px;
  display: grid;
  grid-template-columns: repeat(3, 64px);
  grid-row-gap: 32px;
  grid-column-gap: 16px;
`;

export const Display = styled.div`
  grid-column: span 3;
  border-radius: 8px;
  padding: 16px;
  background-color: #a5a486;
  color: #1f2326;
  font-family: 'LCD';
  font-weight: 500;
  font-size: 96px;
  text-align: right;
  border: 1px inset #ceccca;
`;

export const Label = styled.span`
  font-family: Arial, Helvetica, sans-serif;
  padding: 4px 0px 0px 4px;
  font-size: 16px;
  font-weight: 800;
`;

export const Button = styled.button`
  height: 64px;
  width: 64px;
  border-radius: 100%;
  background-color: #f6f1ef;
  border: 1px solid #75685e;
  box-shadow: 0px 0px 4px #eae5df;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 1;
  color: #5e5957;
  outline: none;
  &:active {
    filter: brightness(0.95);
    box-shadow: 0px 0px 0px #eae5df;
  }
  &:disabled {
    opacity: 0.5;
  }
`;
