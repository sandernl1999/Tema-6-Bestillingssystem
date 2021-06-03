import styles from "./index.module.css";
const SelectBox = (props) => {
  const { onChange, name, size, defaultSize } = props;
  return (
    <select
      onChange={(event) => onChange(event.target.value)}
      name={name}
      size={size}
      className={styles.selectStyle}
    >
      <option
        value={defaultSize}
        key={0}
        selected={!defaultSize ? true : false}
      >
        {""}
      </option>
      {Object.keys(size).map((key, index) => (
        <option key={index + 1} value={key}>
          {key}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
