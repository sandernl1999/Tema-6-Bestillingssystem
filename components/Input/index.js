import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
const InputField = (props) => {
  const { type, name, ...rest } = props;
  return (
    <div style={{ marginTop: "10px" }}>
      <StyledTextField
        id={name}
        variant="outlined"
        size={"small"}
        type={type ? type : "text"}
        style={{
          backgroundColor: "white",
          borderRadius: "3px",
          marginLeft: 0,
        }}
        fullWidth
        {...rest}
      />
    </div>
  );
};

export default InputField;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border: 1.6px solid #000000b3;
    }
  }
  .MuiOutlinedInput-root {
    background: white;
  }
  .MuiOutlinedInput-notchedOutline {
    border-bottom: none;
    border-left: none;
    border-right: none;
    border-top: none;
  }
`;
