import React, { useRef } from "react";
import JoditEditor from "jodit-react";
import "./style.css";

const TextEditor = ({ config, value, onChange, onBlur }) => {
  const editor = useRef(null);
  const contentChange = (content) => {
    onChange(content);
  };
  return (
    <JoditEditor
      ref={editor}
      value={value || ""}
      config={config}
      tabIndex={1}
      onChange={contentChange}
      onBlur={onBlur}
    />
  );
};
export default TextEditor;
