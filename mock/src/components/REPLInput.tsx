import { Dispatch, SetStateAction, useState } from "react";
import "../styles/main.css";
import { ControlledInput } from "./ControlledInput";
import { string } from "prop-types";
import { REPLFunction } from "./REPLFunction"
import { registerCommand, processCommand } from "./REPLFunction";
import { viewMap, searchMap } from "../mockdata";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  // CHANGED
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;

  modeBrief: boolean
  setMode: Dispatch<SetStateAction<boolean>>

  command: string;
  setCommand: Dispatch<SetStateAction<string>>;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // TODO WITH TA : add a count state
  const [count, setCount] = useState<number>(0);
  const [loadedFile, setLoadedFile] = useState<string>('');

  const mockData: Array<{ [key: string]: any }> = [
    { name: "John", age: 30 },
    { name: "Alice", age: 25 },
    { name: "Bob", age: 35 },
  ];

  registerCommand("mode", (args: Array<string>): string | string[][] => {
    props.setCommand("mode");
    const newMode = args[0];
    if (newMode == "verbose") {
      props.setMode(false);
      return "Mode switched to verbose."
    } else if (newMode == "brief") {
      props.setMode(true);
      return "Mode switched to brief."
    } else {
      return "No " + newMode + " mode found. brief and verbose are the two modes."
    }
  })

  registerCommand("load_file", (args: Array<string>): string | string[][] => {
    props.setCommand("load_file ");
    if (args.length === 0) {
      return "Please provide a file name.";
    }
    const filePath: string = args[0];

    if (filePath === "nonexistent.csv") {
      return "Please check input, that file does not exist.";
    }

    const knownConstants: string[] = [];
    knownConstants.push("mockData");
    if (!knownConstants.includes(filePath)) {
      return "Please check input, that file does not exist.";
    }
    setLoadedFile(filePath);
    return "CSV has been loaded succesfully!";
  })

  registerCommand("view", (args: Array<string>): string | string[][] => {
    props.setCommand("view");
    if (loadedFile == "") {
      return "Ensure a file is loaded."
    }

    const fileData = viewMap.get(loadedFile);
    if (Array.isArray(fileData)) {
      return fileData;
    }    
    return "Bad filepath."
  })

  registerCommand("search", (args: Array<string>): string | string[][] => {
    props.setCommand("search");

    if (loadedFile=="") {
      return "Please ensure a file is loaded"
    }

    const params = commandString.split(" ");
    console.log(params);
    const searchResults = searchMap.get(params[2]);
    if (Array.isArray(searchResults)) {
      return [searchResults];
    }
    return "No results found. Ensure your query is case-sensitive and free of errors."
  })



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

    function handleCommand(commandString: string): string | string[][] {
      const [command, ...args] = commandString.split(" ");
      const func = processCommand(command);
      if (func) {
        const value = func(args);
        return value;
      }
      return "Command not found."
      
      // switch (command) {
      //   case "load_file":
      //     return handleLoadCSV(args); // Assuming only one filename argument is expected
      //   // Add more cases for other commands here
      //   default:
      //     return "Unknown command.";
      // }
    }

  function handleLoadCSV(args: Array<string>): string {
    if (args.length === 0) {
      return "Please provide a file name.";
    }
    const filePath: string = args[0];

    if (filePath === "nonexistent.csv") {
      return "Please check input, that file does not exist.";
    }

    const knownConstants: string[] = [];
    knownConstants.push("mockData");
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
