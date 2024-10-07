import React, { useState } from 'react';
import { Box, Button, Typography, Accordion, AccordionSummary, AccordionDetails, TextField, Grid } from '@mui/material';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import PageContainer from 'src/components/container/PageContainer';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

// Initial content for the editor
const initialContent = `You play on a soccer team. The team depends on you as a goalkeeper. You are invited to your best friend's birthday party at the same time as the big game. You would have to miss the game to go to the party. How do you decide what to do?`;

// Example lessons data
const lessons = [
  {
    id: 'panel1',
    title: 'Lesson 1',
    items: [
      '1.1 D.A.R.E Rules',
      '1.2 D.A.R.E. Decision-Making Model',
      '1.3 D.A.R.E. Decision Making Model Practice',
      '1.4 Journal-What I Learned Today',
    ],
  },
  {
    id: 'panel2',
    title: 'Lesson 2',
    items: [
      '2.1 Alcohol - Did You Know?',
      '2.2 Tobacco - Did You Know?',
      '2.3 Illustration - Parts of The Body',
      '2.4 Define The Problem',
      '2.5 Journal - What I Learned Today',
    ],
  },
  // Add more lessons as needed...
];

const EditContent = () => {
  const [expanded, setExpanded] = useState(false); // State to manage accordion expansion
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
    if (editorState) {
      const rawContent = convertToRaw(editorState.getCurrentContent());
      const htmlContent = draftToHtml(rawContent);
      console.log('Saved Title:', title);
      console.log('Saved HTML Content:', htmlContent);
      // Handle saving title and htmlContent to the backend or store as needed
    }
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <PageContainer title="Content Management" >
    <Grid container spacing={2} padding={2}>
      {/* Left Side: Content Box */}
      <Grid item xs={12} md={3} sx={{ fontSize: 20 }}>
        {lessons.map((lesson) => (
          <Accordion
            key={lesson.id}
            expanded={expanded === lesson.id}
            onChange={handleChange(lesson.id)}
          >
            <AccordionSummary
              expandIcon={expanded === lesson.id ? '-' : '+'}
              aria-controls={`${lesson.id}-content`}
              id={`${lesson.id}-header`}
            >
              <Typography variant="h6">{lesson.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {lesson.items.map((item, index) => (
                <Typography key={index} style={{ marginLeft: 5, marginBottom: 10 }}>
                  {item}
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>

      {/* Right Side: Content Box */}
      <Grid item xs={12} md={9}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h6">LESSON 1</Typography>

          <Box display="flex" justifyContent="space-between" width="100%">
            <Button variant="contained" color="primary">Go Back</Button>
            <Button variant="contained" color="primary">Next</Button>
          </Box>

          <TextField
            value={title}
            onChange={handleTitleChange}
            variant="outlined"
            label="Lesson Title"
            fullWidth
            margin="normal"
          />

          <Box border={1} borderRadius={2} padding={2} marginTop={2}>
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
      </Grid>
    </Grid>
    </PageContainer>
  );
};

export default EditContent;
