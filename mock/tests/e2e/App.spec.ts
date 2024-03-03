import { expect, test } from "@playwright/test";


/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach( async ({ page }) => {
    // ... you'd put it here.
    // TODO: Is there something we need to do before every test case to avoid repeating code?
    await page.goto("http://localhost:8000/");
  })

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something 
 * you put before parts of your test that might take time to run, 
 * like any interaction with the page.
 */
test('on page load, i see a login button', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await expect(page.getByLabel('Login')).toBeVisible()
})

test('on page load, i dont see the input box until login', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await expect(page.getByLabel('Sign Out')).not.toBeVisible()
  await expect(page.getByLabel('Command input')).not.toBeVisible()
  
  // click the login button
  await page.getByLabel('Login').click();
  await expect(page.getByLabel('Sign Out')).toBeVisible()
  await expect(page.getByLabel('Command input')).toBeVisible()
})

test('after I type into the input box, its text changes', async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.getByLabel('Login').click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('Awesome command');

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`
  await expect(page.getByLabel('Command input')).toHaveValue(mock_input)
});

test('on page load, i see a button', async ({ page }) => {
  // TODO WITH TA: Fill this in!
  await expect(page.getByLabel('Login')).toBeVisible(); 
});

test('after I click the button, its label increments', async ({ page }) => {
  // TODO WITH TA: Fill this in to test your button counter functionality!

  // Click the login button to reveal the button
  await page.getByLabel("Login").click();

  // Get the initial label text
  const initialLabel = await page.getByLabel("Submit").innerText();

  // Click the button
  await page.getByLabel("Submit").click();

  // Get the updated label text
  const updatedLabel = await page.getByLabel("Submit").innerText();

  // Assert that the label has incremented
  expect(updatedLabel).not.toEqual(initialLabel);
});

test('after I click the button, my command gets pushed', async ({ page }) => {
  // TODO: Fill this in to test your button push functionality!
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file");
  await page.getByLabel("Submit").click;
  await expect (page.getByLabel("Command input")).toBeEmpty
});

test('after I type "load_file" command, it loads the file successfully', async ({ page }) => {
  // Click the login button to reveal the command input
  await page.getByLabel("Login").click();

  // Type the "load_file" command into the input box
  await page.getByLabel("Command input").fill("load_file mockData");
  const checkInput = "load_file mockData";
  await expect(page.getByLabel("Command input")).toHaveValue(checkInput);

  // Submit the command
  await page.getByLabel("Submit").click();
  await expect(page.getByLabel("Command input")).toBeEmpty();

  // Assert that the loaded file message is displayed
  const expectedOutcome = "CSV has been loaded successfully!"
  await expect(page.locator(".repl-history p")).toContainText(expectedOutcome);
});

test('after I type a file path that does not exist I am told', async ({ page }) => {
  // Click the login button to reveal the command input
  await page.getByLabel("Login").click();

  // Type the "load_file" command into the input box
  await page.getByLabel("Command input").fill("load_file doodoo");
  const checkInput = "load_file doodoo";
  await expect(page.getByLabel("Command input")).toHaveValue(checkInput);

  // Submit the command
  await page.getByLabel("Submit").click();
  await expect(page.getByLabel("Command input")).toBeEmpty();

  // Assert that the loaded file message is displayed
  const expectedLoad = "Please check input, that file does not exist.";
  await expect(page.locator(".repl-history p")).toContainText(expectedLoad);
});

test("after I load a file I can view it", async ({
  page,
}) => {
  // Click the login button to reveal the command input
  await page.getByLabel("Login").click();

  // Type the "load_file" command into the input box
  await page.getByLabel("Command input").fill("load_file mockData");
  const loadInput = "load_file mockData";
  await expect(page.getByLabel("Command input")).toHaveValue(loadInput);

  // Submit the command
  await page.getByLabel("Submit").click();
  await expect(page.getByLabel("Command input")).toBeEmpty();

  // Assert that the loaded file message is displayed
  const expectedLoad = "CSV has been loaded successfully!";
  await expect(page.locator(".repl-history p")).toContainText(expectedLoad);

  // Type the "view" command into the input box
  await page.getByLabel("Command input").fill("view");
  const viewInput = "view";
  await expect(page.getByLabel("Command input")).toHaveValue(viewInput);

  // Submit the command
  await page.getByLabel("Submit").click();
  await expect(page.getByLabel("Command input")).toBeEmpty();

  // Assert that the loaded file can be viewed
  const expectedView = "A1,A2,A3,A4,B1,B2,B3,B4,C1,C2,C3,C4,D1,D2,D3,D4";
  await expect(page.locator(".repl-history p:nth-of-type(2)")).toContainText(expectedView);
});

test("after I load an empty file I am told there is nothing to view", async ({ page }) => {
  // Click the login button to reveal the command input
  await page.getByLabel("Login").click();

  // Type the "load_file" command into the input box
  await page.getByLabel("Command input").fill("load_file mockData3");
  const loadInput = "load_file mockData3";
  await expect(page.getByLabel("Command input")).toHaveValue(loadInput);

  // Submit the command
  await page.getByLabel("Submit").click();
  await expect(page.getByLabel("Command input")).toBeEmpty();

  // Assert that the loaded file message is displayed
  const expectedLoad = "CSV has been loaded successfully!";
  await expect(page.locator(".repl-history p")).toContainText(expectedLoad);

  // Type the "view" command into the input box
  await page.getByLabel("Command input").fill("view");
  const viewInput = "view";
  await expect(page.getByLabel("Command input")).toHaveValue(viewInput);

  // Submit the command
  await page.getByLabel("Submit").click();
  await expect(page.getByLabel("Command input")).toBeEmpty();

  // Assert that the loaded file can be viewed
  const expectedView = "No data found for the loaded file.";
  await expect(page.locator(".repl-history p:nth-of-type(2)")).toContainText(expectedView);
});

test("after typing command view without loading a file it fails", async ({ page }) => {
  // Click the login button to reveal the command input
  await page.getByLabel("Login").click();

  // Type the "view" command into the input box
  await page.getByLabel("Command input").fill("view");
  const viewInput = "view";
  await expect(page.getByLabel("Command input")).toHaveValue(viewInput);

  // Submit the command
  await page.getByLabel("Submit").click();
  await expect(page.getByLabel("Command input")).toBeEmpty();

  // Assert that the loaded file can be viewed
  const expectedView = "Ensure a file is loaded.";
  await expect(page.locator(".repl-history p")).toContainText(expectedView);
});

test("after I load a file I can search it", async ({ page }) => {
  // Click the login button to reveal the command input
  await page.getByLabel("Login").click();

  // Type the "load_file" command into the input box
  await page.getByLabel("Command input").fill("load_file mockData");
  const loadInput = "load_file mockData";
  await expect(page.getByLabel("Command input")).toHaveValue(loadInput);

  // Submit the command
  await page.getByLabel("Submit").click();
  await expect(page.getByLabel("Command input")).toBeEmpty();

  // Assert that the loaded file message is displayed
  const expectedLoad = "CSV has been loaded successfully!";
  await expect(page.locator(".repl-history p")).toContainText(expectedLoad);

  // Type the "search" command into the input box
  await page.getByLabel("Command input").fill("search mockData A1");
  const searchInput = "search mockData A1";
  await expect(page.getByLabel("Command input")).toHaveValue(searchInput);

  // Submit the command
  await page.getByLabel("Submit").click();
  await expect(page.getByLabel("Command input")).toBeEmpty();

  // Assert that the loaded file can be searched
  const expectedSearch = "A1,A2,A3,A4";
  await expect(page.locator(".repl-history p:nth-of-type(2)")).toContainText(expectedSearch);
});

test("search argument is case-senstive", async ({ page }) => {
  // Click the login button to reveal the command input
  await page.getByLabel("Login").click();

  // Type the "load_file" command into the input box
  await page.getByLabel("Command input").fill("load_file mockData");
  const loadInput = "load_file mockData";
  await expect(page.getByLabel("Command input")).toHaveValue(loadInput);

  // Submit the command
  await page.getByLabel("Submit").click();
  await expect(page.getByLabel("Command input")).toBeEmpty();

  // Assert that the loaded file message is displayed
  const expectedLoad = "CSV has been loaded successfully!";
  await expect(page.locator(".repl-history p")).toContainText(expectedLoad);

  // Type the "search" command into the input box
  await page.getByLabel("Command input").fill("search fail");
  const searchInput = "search fail";
  await expect(page.getByLabel("Command input")).toHaveValue(searchInput);

  // Submit the command
  await page.getByLabel("Submit").click();
  await expect(page.getByLabel("Command input")).toBeEmpty();

  // Assert that the loaded file can be searched
  const expectedSearch = "No results found. Ensure your query is case-sensitive and free of errors.";
  await expect(page.locator(".repl-history p:nth-of-type(2)")).toContainText(expectedSearch);
});

test("search fails with no loaded file", async ({ page }) => {
  // Click the login button to reveal the command input
  await page.getByLabel("Login").click();

  // Type the "search" command into the input box
  await page.getByLabel("Command input").fill("search mockData A1");
  const searchInput = "search mockData A1";
  await expect(page.getByLabel("Command input")).toHaveValue(searchInput);

  // Submit the command
  await page.getByLabel("Submit").click();
  await expect(page.getByLabel("Command input")).toBeEmpty();

  // Assert that the loaded file can be searched
  const expectedSearch = "Please ensure a file is loaded.";
  await expect(page.locator(".repl-history p")).toContainText(expectedSearch);
});