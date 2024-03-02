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
/**
 * REPLInput function. takes in a history, a mode boolean, and command string.
 * Registers the necessary commands and processes the input, calling the desired REPLFunction
 * with the given command parameters.
 * 
 * @param props 
 * @returns 
 */
export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [loadedFile, setLoadedFile] = useState<string>('');

  /**
   * Registers the mode switch command.
   * 
   */
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

  /**
   * Registers the load_file command.
   * 
   */
  registerCommand("load_file", (args: Array<string>): string | string[][] => {
    props.setCommand("load_file ");
    if (args.length === 0) {
      return "Please provide a file name.";
    }
    const filePath: string = args[0];

    if (filePath === "nonexistent.csv") {
      return "Please check input, that file does not exist.";
    }

    if (filePath in viewMap.keys) {
      return "Please check input, that file does not exist.";
    }
    setLoadedFile(filePath);
    return "CSV has been loaded succesfully!";
  })

  /**
   * Registers the view command.
   * 
   */
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

  /**
   * Registers the search command.
   * 
   */
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



  /**
   * Processes the command upon the submit button being clicked. Delegates to the correct
   * REPLFunction based on the command name given, and adds the result to the REPLHistory,
   * in different ways depending on the mode. 
   * 
   * @param commandString - full command given including command parameters
   * @returns nothing, but adds results to history
   */
  function handleSubmit(commandString: string) {
    setCount(count + 1);
    if (!commandString.trim()) {
      return; // Do nothing if commandString is empty or whitespace
    }
    const result = handleCommand(commandString); // Call handleCommand to process the command
    const resultText = "Result: "
    const commandText = "Command: "
    if (props.modeBrief) {      
      props.setHistory([...props.history, `${result}`])
      setCommandString("");
    } else {
      props.setHistory([...props.history, `${commandText} ${commandString} ${resultText} ${result}`]);
      setCommandString("");
    }
  }

    /**
     * Handles the given command. Uses REPLFunction's proccessCommand to return the desired 
     * REPLFunction, and passes only the command parameters, not the command name itself,
     * into the correct function.
     * 
     * @param commandString - full command string including parameters
     * @returns the result of the command with the given command parameters
     */
    function handleCommand(commandString: string): string | string[][] {
      const [command, ...args] = commandString.split(" ");
      const func = processCommand(command);
      if (func) {
        const value = func(args);
        return value;
      }
      return "Command not found."
    }

  
  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button onClick={() => handleSubmit(commandString)}>
        Submitted {count} times
      </button>
    </div>
  );
}
