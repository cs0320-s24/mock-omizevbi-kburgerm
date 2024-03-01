import { func } from "prop-types";

/**
 * A command-processor function for our REPL. The function returns a string, which is the value to print to history when
 * the command is done executing.
 *
 * The arguments passed in the input (which need not be named "args") should
 * *NOT* contain the command-name prefix.
 */
export interface REPLFunction {
  (args: Array<string>): String | String[][];
}

/**
 * Command Registry Interface
 */
interface CommandRegistry {
    [command: string]: REPLFunction;
}
 

const registry = new Map<string, REPLFunction>
/**     
 * * Register a new command
 * @param command Command name
 * @param func Function to execute for the command
 */
export const registerCommand = (command: string, func: REPLFunction) => {
    registry.set(command, func)
};

/**
 * Process a command
 * @param input Input string containing command and arguments
 */
export const processCommand = (command: string): REPLFunction | undefined => {
    return registry.get(command)
};
