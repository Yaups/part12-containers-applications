import { render, screen } from "@testing-library/react";
import { Todo } from "./List";

test("Todo renders content correctly", () => {
  const todo = {
    text: "This text should match",
    done: false,
  };

  render(
    <Todo todo={todo} onClickComplete={() => null} onClickDelete={() => null} />
  );

  const text = screen.getByText(todo.text);
  expect(text).toBeDefined();
});
