# Project Details
This program is a basic frontend application that uses mocked data to demonstrate basic functionality for loading, searching, and viewing a CSV file. Users must log in in order to use the program, and upon signing in, there is a place to input commands and a blank screen where past commands and their results will go. After entering a command, the user will receive a message about the output of their command, and the command itself as well if the program is in verbose mode. If the user inputs a command that is not recognized or a valid command but incorrect command parameters, an informative error message will be displayed. After signing out, the user will no longer be able to enter commands nor view past commands.
# Design Choices
The main functionality of the program is handled within REPLInput. REPLInput processes the given input command, decides which function should be called, and passes in the parameters of the function, if there are any, to the function and returns its result. This result is added to the REPLHistory array, which displays and organizes past commands and results. The verbose mode is used to decide how the commands and their outputs should be stored in the history. All commands and results are returned as strings. This choice maintains simplicity and while HTML tables were considered as an output, their organization was not as well-maintained and was not displayed in an understandable way. If the application were used to handle data outside of mocked datasets, however, an HTML table may be desirable, especially for larger datasets. All of these components are handled by the top-level organizational class, REPL, which organizes the REPLHistory and REPLInput components.
# Errors/Bugs

# Tests
Use "npx playwright test" in the terminal to run tests.
# How to
To load a file: 'load_file "filename"'
To view a file: 'view'
To search a file: 'search "column name or index" "search term"'
To change mode: 'mode "verbose"', for verbose mode, and
                'mode "brief"', for brief mode.
For developers, new commands can be registered by using the registerCommand function of the REPLFunction class in the body of the REPLInput method.
# Collaboration
