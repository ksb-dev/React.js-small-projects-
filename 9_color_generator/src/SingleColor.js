import React, { useState, useEffect } from 'react';
import rgbToHex from './utils';

const SingleColor = ({rgb, weight, index, hexColor}) => {
  const [alert, setAlert] = useState(false);
  const rgbColor = rgb.join(',');
  //const hex = rgbToHex(...rgb);
  const hexValue = `#${hexColor}`

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [alert]);

  return (
    <article 
      className={`color ${index > 10 && 'color-light'}`} 
      style={{backgroundColor:`rgb(${rgbColor})`}}
      onClick={() => {
        setAlert(true);
        navigator.clipboard.writeText(hexValue);

        /*setTimeout(() => {
          setAlert(false);
        }, 1000);*/
      }}
    >
      <p className="percent-value">{weight}%</p>
      <p className="color-value">{hexValue}</p>
      {
        alert && <p className="alert">copied to clipboard</p>
      }
    </article>
  )
}

export default SingleColor;