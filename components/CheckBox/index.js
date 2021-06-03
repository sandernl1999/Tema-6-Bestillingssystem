const CheckBox = (props) => {
  const { value, ...rest } = props;
  return (
    <input
      style={{ width: "20px", height: "20px" }}
      type="checkbox"
      value={value ? "Yes" : "No"}
      {...rest}
    />
  );
};

export default CheckBox;
