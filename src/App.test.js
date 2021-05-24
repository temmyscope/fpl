import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import App from './App';

var container = null;

const simulateClick = (item) => {
  item.dispatchEvent(new MouseEvent('mousedown', {bubbles: true}));
  item.dispatchEvent(new MouseEvent('mouseout', {bubbles: true}));
  item.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  item.dispatchEvent(new Event('change', {bubbles: true}));
  return item;
}

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

test('Check if content renders i.e. not empty', async() => {

  act(() => {
    render(<App />, container);
  });
  const pageContent = document.querySelector(".App");
  expect(pageContent.innerHTML).not.toBe('');

});

it("Search Input value is empty", () => {
  
  act(() => {
    render(<App />, container);
  });

  const searchInput = document.querySelector(".myInput");
  expect(searchInput.value).toBe("");
});


it("Other filters become default after category is changed", () => {
  const onChange = jest.fn();
  act(() => {
    render(<App />, container);
  });

  let categorySelect = document.querySelector("#cat");
  expect(categorySelect.value).toBe("all");

  act(() => {
    //categorySelect.dispatchEvent( new MouseEvent('select', { option: 'education' }) );
    categorySelect = simulateClick(categorySelect);
  });

  const orderSelect = document.querySelector("#order");
  const dateSelect = document.querySelector("#date");

  expect(onChange.value).not.toBe('all');
  expect(orderSelect.value).toBe("default");
  expect(dateSelect.value).toBe("default");
});