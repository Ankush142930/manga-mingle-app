const GenderCheckBox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === 'Male' ? 'selected' : ''
          }`}
        >
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox border-sky-500 border-2"
            checked={selectedGender === 'Male'}
            onChange={() => onCheckboxChange('Male')}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === 'Female' ? 'selected' : ''
          }`}
        >
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            className="checkbox border-sky-500 border-2 "
            checked={selectedGender === 'Female'}
            onChange={() => onCheckboxChange('Female')}
          />
        </label>
      </div>
    </div>
  );
};
export default GenderCheckBox;
