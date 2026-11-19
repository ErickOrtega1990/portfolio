import style from "./TextInput.module.css";

type Props = {
  type: "text" | "password" | "email" | "textArea";
  id: string;
  label?: string;
  placeHolder: string;
  onclick: () => void;
};

function textInput({ type, id, placeHolder, label, onclick, ...rest }: Props) {
  const singleLineInput = (
    <input
      className={style.textInput}
      type={type}
      id={id}
      placeholder={placeHolder}
      onClick={onclick}
      {...rest}
    />
  );

  const textArea = (
    <textarea
      id={id}
      placeholder={placeHolder}
      className={style.textArea}
      rows={10}
      onClick={onclick}
      {...rest}
    ></textarea>
  );

  return (
    <>
      {label !== "" ? (
        <label className={style.label} htmlFor={id}>
          {label}
        </label>
      ) : null}
      {type === "textArea" ? textArea : singleLineInput}
    </>
  );
}

export default textInput;
