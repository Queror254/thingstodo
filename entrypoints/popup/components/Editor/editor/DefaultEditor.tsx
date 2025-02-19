import React, { useState, ChangeEvent } from "react";
import { Editor, EditorProps } from "./Editor";
import { EditorProvider } from "./EditorContext";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  HtmlButton,
  Separator,
  Toolbar,
} from "../toolbar";

interface CustomEditorProps {
  onChange: (value: string) => void; // Add this line to define the onChange prop
}

const DefaultEditor: React.FC<CustomEditorProps> = ({ onChange }) => {
  const [value, setValue] = useState<string>("");

  const handleEditorChange = (e: any) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <EditorProvider>
      <Editor value={value} onChange={handleEditorChange}>
        <Toolbar>
          <BtnUndo />
          <BtnRedo />
          <Separator />
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
          <BtnClearFormatting />
          <HtmlButton />
          <Separator />
          <BtnStyles />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
};

export default DefaultEditor;

/**export const DefaultEditor = React.forwardRef(function DefaultEditor(
  props: EditorProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <EditorProvider>
      <Editor {...props} ref={ref}>
        <Toolbar>
          <BtnUndo />
          <BtnRedo />
          <Separator />
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
          <BtnClearFormatting />
          <HtmlButton />
          <Separator />
          <BtnStyles />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
}); **/
