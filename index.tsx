import React, { useState } from 'react';
import { render } from 'react-dom';
import './style.css';

enum InputName {
  STRING = 'string',
  CHARACTERS = 'characters',
}

enum RadioInputValue {
  START = 'start',
  END = 'end',
}

const maskStart = (stringToMask: string, charToMask: number): string => {
  const baseString = stringToMask;
  const stringWthoutCharToMask = baseString.slice(
    charToMask,
    baseString.length
  );
  const masked = stringWthoutCharToMask.padStart(baseString.length, '*');

  return masked;
};

const maskEnd = (stringToMask: string, charToMask: number): string => {
  const baseString = stringToMask;
  const stringWthoutCharToMask = baseString.slice(
    0,
    baseString.length - charToMask
  );
  const masked = stringWthoutCharToMask.padEnd(baseString.length, '*');

  return masked;
};

const App = () => {
  const [inputStringValue, setInputStringValue] = useState<string>('');
  const [inputCharactersValue, setInputCharactersValue] = useState<string>('');
  const [maskedValue, setMaskedValue] = useState<string>('');
  const [maskDirection, setMaskDirection] = useState<string>(
    RadioInputValue.START
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (maskDirection === RadioInputValue.START)
      setMaskedValue(maskStart(inputStringValue, +inputCharactersValue));
    if (maskDirection === RadioInputValue.END)
      setMaskedValue(maskEnd(inputStringValue, +inputCharactersValue));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    if (name === InputName.STRING) setInputStringValue(value);
    if (name === InputName.CHARACTERS) setInputCharactersValue(value);
    if (value === RadioInputValue.START) setMaskDirection(value);
    if (value === RadioInputValue.END) setMaskDirection(value);
  };

  return (
    <div>
      <h1> Mask string or number </h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            String or number to mask
            <input onChange={handleChange} name={InputName.STRING} />
          </label>
          <label>
            Amount of characters to mask
            <input
              onChange={handleChange}
              name={InputName.CHARACTERS}
              type='number'
              min={0}
            />
          </label>
          <div style={{ margin: '20px 0' }}>
            <p>Mask direction</p>
            <label>
              Start
              <input
                type='radio'
                value={RadioInputValue.START}
                name='mask-direction'
                checked={maskDirection === RadioInputValue.START}
                onChange={handleChange}
              />
            </label>
            <label>
              End
              <input
                type='radio'
                value={RadioInputValue.END}
                name='mask-direction'
                checked={maskDirection === RadioInputValue.END}
                onChange={handleChange}
              />
            </label>
          </div>
          <button
            disabled={!(inputStringValue && inputCharactersValue !== '')}
            type='submit'
          >
            Mask
          </button>
        </form>
      </div>
      {maskedValue && <p>Masked number: {maskedValue}</p>}
    </div>
  );
};

render(<App />, document.getElementById('root'));
