import React from 'react';

const FormInput = ({ handleChange,className, label, classNameInput, matchMessage, requiredMessage ,...otherProps }) => (
  <div className={className?`group${className}`:'group'}>
    {label ? (
      <label
        className={'label'}
      >
        {label}
      </label>
    ) : null}
    <input
      onKeyPress={evt=>evt.target.setCustomValidity('')} 
      onKeyUp={evt=>{
          if (evt.target.validity.typeMismatch) {
            evt.target.setCustomValidity(matchMessage);
          }else{
            if (evt.target.validity.valueMissing){
              evt.target.setCustomValidity(requiredMessage);
            }else{
              evt.target.setCustomValidity('');
            }
          }
        } 
      }
      onKeyDown={evt=>evt.target.setCustomValidity('')} 
      onInput={evt=>evt.target.setCustomValidity('')} 
      className={classNameInput?classNameInput:'input' }
      onChange={handleChange} {...otherProps} />
  </div>
);

export default FormInput;