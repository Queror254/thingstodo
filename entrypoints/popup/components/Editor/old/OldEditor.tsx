import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Separator,
  BtnUndo,
  BtnRedo,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
  BtnClearFormatting,
  BtnStyles,
  HtmlButton,
  Editor,
  EditorProvider,
  Toolbar,
  ContentEditableEvent,
} from "react-simple-wysiwyg";

interface CustomEditorProps {
  onChange: (value: string) => void;
  initialValue?: string;
}

const CustomEditor: React.FC<CustomEditorProps> = ({
  onChange,
  initialValue,
}) => {
  const [editorValue, setEditorValue] = useState<string>(
    initialValue || "add your description here"
  );

  const handleEditorChange = (e: ContentEditableEvent) => {
    setEditorValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <EditorProvider>
      <Editor value={editorValue} onChange={handleEditorChange}>
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

export default CustomEditor;
