import { startScreenReader } from "../src";

describe("shout", () => {
  it("should output for simple webpage", async () => {
    jest.setTimeout(100000);

    await page.goto("https://www.google.com");

    try {
      const stop = await startScreenReader();

      await new Promise(r => setTimeout(r, 10000));

      const result = await stop();

      console.log(result);
    } catch (err) {
      console.log(err.details);
    }

    // await page.goto("http://localhost:8080");

    // const { result, stop } = await startScreenReader();

    // await stop();

    // expect(result).toMatchSnapshot();
  });
});
