import React, { useState } from 'react';
import { EditorState, Editor, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const WysiwygEditor = ({ initialContent = '', onEditorChange }) => {
  const [editorState, setEditorState] = useState(
    initialContent
      ? EditorState.createWithContent(ContentState.createFromText(initialContent))
      : EditorState.createEmpty()
  );

  const handleEditorChange = (state) => {
    setEditorState(state);
    onEditorChange(state); // Notify parent about the editor changes
  };

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={handleEditorChange}
      editorStyle={{
        border: '1px solid #F1F1F1',
        // minHeight: '200px',
        padding: '10px',
      }}
    />
  );
};

export default WysiwygEditor;
