import React, { useState } from 'react';
import { render } from 'react-dom';
import './style.css';

const maskStart = (
  stringToMask: string | number,
  charToMask: number
): string => {
  const baseString = stringToMask.toString();
  const stringWthoutCharToMask = baseString.slice(
    charToMask,
    baseString.length
  );
  const masked = stringWthoutCharToMask.padStart(baseString.length, '*');

  return masked;
};

const maskEnd = (stringToMask: string | number, charToMask: number): string => {
  const baseString = stringToMask.toString();
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
  const [maskDirection, setMaskDirection] = useState<string>('start');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (maskDirection === 'start')
      setMaskedValue(maskStart(inputStringValue, +inputCharactersValue));
    if (maskDirection === 'end')
      setMaskedValue(maskEnd(inputStringValue, +inputCharactersValue));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    if (name === 'string') setInputStringValue(value);
    if (name === 'characters') setInputCharactersValue(value);
    if (value === 'start') setMaskDirection(value);
    if (value === 'end') setMaskDirection(value);
  };

  return (
    <div>
      <h1> Mask string or number </h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            String or number to mask
            <input onChange={handleChange} name='string' />
          </label>
          <label>
            Characters or numbers to mask
            <input
              onChange={handleChange}
              name='characters'
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
                value='start'
                name='mask-direction'
                checked={maskDirection === 'start'}
                onChange={handleChange}
              />
            </label>
            <label>
              End
              <input
                type='radio'
                value='end'
                name='mask-direction'
                checked={maskDirection === 'end'}
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
