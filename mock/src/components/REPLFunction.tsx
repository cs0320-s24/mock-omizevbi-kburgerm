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

/**
 * Command Processor Class
 */
class CommandProcessor {
    private registry: CommandRegistry = {};

    /**
     * Register a new command
     * @param command Command name
     * @param func Function to execute for the command
     */
    registerCommand(command: string, func: REPLFunction) {
        this.registry[command] = func;
    }

    /**
     * Process a command
     * @param input Input string containing command and arguments
     */
    processCommand(input: string) {}
}