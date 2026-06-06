import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button, LoadingButton } from "../src";

describe("buttons", () => {
  it("renders a button", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("disables loading button", () => {
    render(<LoadingButton loading>Saving</LoadingButton>);
    expect(screen.getByRole("button", { name: "Saving" })).toBeDisabled();
  });
});
