import { Dispatch, SetStateAction, useState } from "react";
import "../styles/main.css";
import { ControlledInput } from "./ControlledInput";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  // CHANGED
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // TODO WITH TA : add a count state
  const [count, setCount] = useState<number>(0);

  const mockData: Array<{ [key: string]: any }> = [
    { name: "John", age: 30 },
    { name: "Alice", age: 25 },
    { name: "Bob", age: 35 },
  ];

  // This function is triggered when the button is clicked.
  function handleSubmit(commandString: string) {
    setCount(count + 1);
    // CHANGED
    if (!commandString.trim()) {
      return; // Do nothing if commandString is empty or whitespace
    }
    const result = handleCommand(commandString); // Call handleCommand to process the command
    props.setHistory([...props.history, `${commandString} - ${result}`]);
    setCommandString("");
    // props.setHistory([...props.history, commandString]);
    // setCommandString("");
  }

    function handleCommand(commandString: string): string {
      const [command, ...args] = commandString.split(" ");
      switch (command) {
        case "load_file":
          if (args.length === 0) {
            return "Please provide a file name.";
          }
          return handleLoadCSV(args); // Assuming only one filename argument is expected
        // Add more cases for other commands here
        default:
          return "Unknown command.";
      }
    }

  function handleLoadCSV(args: Array<string>): string {
    const filePath: string = args[0];

    if (filePath === "nonexistent.csv") {
      return "Please check input, that file does not exist.";
    }

    const knownConstants: string[] = Object.keys(window); // Get all global variables as potential constants
    if (!knownConstants.includes(filePath)) {
      return "Please check input, that file does not exist.";
    }

    return "CSV has been loaded succesfully!";
  }

  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <button onClick={() => handleSubmit(commandString)}>
        Submitted {count} times
      </button>
    </div>
  );
}
