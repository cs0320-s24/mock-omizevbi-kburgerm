import "../styles/main.css";

interface REPLHistoryProps {
  history: string[];
}

/**
 * 
 * @param props - the REPLHistory props, specifically, the history array
 * @returns the history HTML component with the history information
 */
export function REPLHistory(props: REPLHistoryProps) { 
  return (
    <div className="repl-history" aria-label="repl-history">
      {
      props.history.map((command, index) => ( 
        <p>{command}</p>        
      ))}
    </div>
  );
}
