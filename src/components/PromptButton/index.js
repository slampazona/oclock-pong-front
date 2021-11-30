/**
 * @module src/components/PromptButton
 */
import {
  useState, useCallback, useEffect, useRef,
} from 'react';
import PropType from 'prop-types';
import './styles.scss';

const PromptButton = ({ message, onValidation, children }) => {
  const inputRef = useRef();
  const [isOpen, setOpen] = useState(false);
  const [text, setText] = useState('');
  const validateModal = useCallback((event) => {
    event.preventDefault();
    if (onValidation) {
      onValidation(text);
    }
    setOpen(false);
  }, [text]);

  useEffect(() => {
    if (isOpen) {
      setText('');
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      {
        isOpen && (
          <form className="promptModal" onSubmit={validateModal}>
            <p className="promptModal__message">{message}</p>
            <input
              ref={inputRef}
              type="text"
              className="promptModal__text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              maxLength={10}
            />
            <button type="submit" className="promptModal__button button">OK</button>

          </form>
        )
      }
      <button type="button" className="button" onClick={setOpen.bind(this, true)}>{children}</button>
    </>
  );
};

PromptButton.propTypes = {
  children: PropType.string,
  message: PropType.string,
  onValidation: PropType.func,
};

PromptButton.defaultProps = {
  message: '',
  children: null,
  onValidation: () => { },
};

export default PromptButton;
