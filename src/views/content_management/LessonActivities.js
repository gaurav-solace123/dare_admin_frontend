import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'react-router-dom';

// Example lessons data
const lessons = [
  { title: "How to Keep It Real", subtitle: "Lesson 1 Subtitle", content: "Lesson 1 detailed content goes here." },
  { title: "Introduction", subtitle: "Lesson 2 Subtitle", content: "Lesson 2 detailed content goes here." },
  { title: "Real Questions", subtitle: "Lesson 3 Subtitle", content: "Lesson 3 detailed content goes here." },
  { title: "Choices", subtitle: "Lesson 4 Subtitle", content: "Lesson 4 detailed content goes here." },
];

const LessonActivities = () => {
  const { id } = useParams();

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Lessons & Activities for Session {id}
      </Typography>

      {lessons.map((lesson, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div>
              <Typography variant="h6" fontWeight="bold">{lesson.title}</Typography>
              <Typography variant="subtitle1" color="textSecondary">{lesson.subtitle}</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{lesson.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default LessonActivities;
