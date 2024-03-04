import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import { REPLFunction } from "./REPLFunction"

/* *
Top-level function for the frontend app. sets up history and input components.

@return a REPLHistory component and a REPLInput component  
*/
export default function REPL() {
  const [history, setHistory] = useState<string[]>([]);
  const [command, setCommand] = useState<string>("");

  const [modeBrief, setMode] = useState<boolean>(true);
  return (
    <div className="repl">
      <REPLHistory history={history} />
      <hr></hr>
      <REPLInput history={history} setHistory={setHistory} command = {command} 
      setCommand={setCommand} modeBrief={modeBrief} setMode={setMode}/>
    </div>
  );
}
