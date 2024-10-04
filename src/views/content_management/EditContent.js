import React, { useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

// Initial content for the editor
const initialContent = `You play on a soccer team. The team depends on you as a goalkeeper. You are invited to your best friend's birthday party at the same time as the big game. You would have to miss the game to go to the party. How do you decide what to do?`;

const EditContent = () => {
  // State for title
  const [title, setTitle] = useState('D.A.R.E. Decision Making Model Practice');
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // State for editor content
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(initialContent))
  );

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleSave = () => {
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const htmlContent = draftToHtml(rawContent);
    console.log('Saved Title:', title);
    console.log('Saved HTML Content:', htmlContent);
    // Handle saving title and htmlContent to the backend or store as needed
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h6">LESSON 1</Typography>

      <Box display="flex" justifyContent="space-between" width="100%">
        <Button variant="contained" color="primary">Go Back</Button>
        <Button variant="contained" color="primary">Next</Button>
      </Box>

      {/* TextField for editing the title */}
      <TextField
        value={title}
        onChange={handleTitleChange}
        variant="outlined"
        label="Lesson Title"
        fullWidth
        margin="normal"
      />

      <Box border={1} borderRadius={2} padding={2} marginTop={2} width="100%">
        <Typography variant="h6">Situation 1</Typography>

        {/* WYSIWYG editor */}
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={handleEditorChange}
          editorStyle={{
            border: '1px solid #F1F1F1',
            minHeight: '200px',
            padding: '10px',
          }}
        />
      </Box>

      <Button 
        variant="contained" 
        color="primary" 
        style={{ marginTop: 20 }} 
        onClick={handleSave}
      >
        Update
      </Button>
    </Box>
  );
};

export default EditContent;
