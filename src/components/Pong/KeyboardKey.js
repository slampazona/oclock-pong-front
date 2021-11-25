/**
 * @module src/components/KeyboardKey
 */
import PropType from 'prop-types';

const KeyboardKey = ({ keyValue }) => (
  <div className="keyboardKey">{keyValue}</div>
);

KeyboardKey.propTypes = {
  keyValue: PropType.string.isRequired,
};

export default KeyboardKey;
