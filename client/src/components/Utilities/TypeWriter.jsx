import { useTypewriter, Cursor } from "react-simple-typewriter"
import "./TypeWriter.css"

function TypeWriter(prop) {
    const [text] = useTypewriter({
      words: [`${prop.text}`],
      typeSpeed: 50,
    });
  
    // Separa las letras que deseas cambiar de color del resto del texto
    const lettersToChange = {
      letter1: prop.letterToChange1,
      letter2: prop.letterToChange2,
    };
    const letterColor = prop.letterColor;
    const fontSize = prop.fontSize
  
    return (
      <h1 className="TypeWriter">
        <span className="text" style={{ fontSize: fontSize }}>
          {/* El resto del texto */}
          {text.split("").map((letter, index) => {
            for (const letterToChange in lettersToChange) {
              if (text[index] === lettersToChange[letterToChange]) {
                return (
                  <span
                    key={index}
                    style={{ color: letterColor }}
                  >
                    {letter}
                  </span>
                );
              }
            }
            return <span key={index}>{letter}</span>;
          })}
        </span>
        <span className="cursor" style={{ color: letterColor, fontSize: fontSize }}>
          <Cursor cursorStyle="<"/>
        </span>
      </h1>
    );
  }

export default TypeWriter;