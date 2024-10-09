import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Grid,
} from "@mui/material";
import { EditorState, convertToRaw, ContentState ,convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import PageContainer from "src/components/container/PageContainer";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import CustomSelect from "../../components/forms/theme-elements/CustomSelectField";
import Api from "../../services/constant";
import { getData, patchData } from "../../services/services";
import Loader from "../../components/Loader";
import commonFunc from "../../utils/common";
import useCustomToast from "../../hooks/CustomToastHook";

// Initial content for the editor
const initialContent = `You play on a soccer team. The team depends on you as a goalkeeper. You are invited to your best friend's birthday party at the same time as the big game. You would have to miss the game to go to the party. How do you decide what to do?`;

// Example lessons data
const lessons = [
  {
    id: "panel1",
    title: "Lesson 1",
    items: [
      "1.1 D.A.R.E Rules",
      "1.2 D.A.R.E. Decision-Making Model",
      "1.3 D.A.R.E. Decision Making Model Practice",
      "1.4 Journal-What I Learned Today",
    ],
  },
  {
    id: "panel2",
    title: "Lesson 2",
    items: [
      "2.1 Alcohol - Did You Know?",
      "2.2 Tobacco - Did You Know?",
      "2.3 Illustration - Parts of The Body",
      "2.4 Define The Problem",
      "2.5 Journal - What I Learned Today",
    ],
  },
  // Add more lessons as needed...
];

const EditContent = () => {
  const { showToast, ToastComponent } = useCustomToast();

  const [expanded, setExpanded] = useState(false); // State to manage accordion expansion
  const [title, setTitle] = useState("D.A.R.E. Decision Making Model Practice");
  const [isLoading, setIsLoading] = useState(false);

  const [currentLessonDetails, setCurrentLessonDetails] = useState({
    lessonName: "LESSON 1",
    lessonTitle: "D.A.R.E. Decision Making Model Practice",
  });
  const [contentDetails, setContentDetails] = useState([]);
  const [workbooks, setWorkbooks] = useState([]);
  const [lessonsData, setLessonsData] = useState([]);
  const [moduleItems, setModuleItems] = useState([]);
  const [workbookId, setWorkbookId] = useState("wGmQH6ECYV");
  const handleTitleChange = (event) => {
    // setTitle(event.target.value);
    setCurrentLessonDetails({
      ...currentLessonDetails,
      lessonTitle: event.target.value,
    });
  };

  // State for editor content
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(initialContent))
  );

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState); // Update the editor state
  
    const rawContent = convertToRaw(newEditorState.getCurrentContent());
    const newDetailText = rawContent.blocks.map((block) => block.text); // Extract detailText from editor
  
    // Update contentDetails with the new detailText while keeping objectId and other data intact
    setContentDetails((prevDetails) => {
      return prevDetails.map((item, index) => ({
        ...item,
        detailText: newDetailText[index] || item.detailText, // Update detailText for each corresponding item
      }));
    });
  };
  const handleChangeLessons = (item, lessonNo) => {
    setCurrentLessonDetails({
      lessonName: lessonNo,
      lessonTitle: item?.name,
      moduleId: item?.objectId,
    });

    const tempContent = moduleItems.filter(
      (element) =>
        element?.module?.objectId === item?.objectId && element?.detailText
    );
    console.log("tempContent", tempContent);
    setContentDetails(tempContent)
    const htmlContent = commonFunc.generateHTMLContent(tempContent)

  const blocksFromHTML = convertFromHTML(htmlContent);
  const contentState = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  setEditorState(EditorState.createWithContent(contentState));
  };
  const handleSave = () => {
    if (editorState) {
      const rawContent = convertToRaw(editorState.getCurrentContent());
      const htmlContent = draftToHtml(rawContent);
      console.log("Saved Title:", title);
      console.log("Saved HTML Content:", htmlContent);
      const savedDetails = contentDetails.map((item) => ({
        detailText: item.detailText,
        itemIds: item.objectId,
      }));

      updateContent(savedDetails)
      // Handle saving title and htmlContent to the backend or store as needed
    }
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const fetchData = async () => {
    setIsLoading(true);
    const url =
      "https://www.dareremote.org/parse/functions/fetchModuleDataForWorkbook";
    const payload = {
      workbookId,
      _ApplicationId: "MLtfFvD42DtH5U5GFdkr0z1HslEJjwdcELFAeanV",
      _JavaScriptKey: "K9Z2YZvG8zC22e66VsAEujnmQ66PaR7pf8WShhsN",
      _ClientVersion: "js1.8.5",
      _InstallationId: "b900596a-b0b3-8803-f835-b61a993fb5f3",
      _SessionToken: "r:e2605c1874ffbca8af2bf60ea0180564",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      setIsLoading(false);
      if (result?.result) {
        let tempData = result?.result?.moduleData?.lessons.map((item) => ({
          id: item?.name,
          lessonId: item?.objectId,
          title: item?.name,
        }));

        const updatedTempDataArray = tempData?.map((tempData, tempIndex) => {
          const filteredItems = result?.result?.moduleData?.modules
            .filter((mod) => mod.lesson.objectId === tempData.lessonId) // Filter by lessonId
            .map((mod) => ({
              objectId: mod.objectId,
              name: mod.name,
            }));

          return {
            ...tempData,
            items: filteredItems, // Replace items with filtered array of objectId and name
          };
        });
        setLessonsData(updatedTempDataArray);
        setModuleItems(result?.result?.moduleItems);
        console.log("first", updatedTempDataArray);
      }
    } catch (error) {
      console.error("Error fetching module data:", error);
    }
  };

  const getListData = async () => {
    try {
      setIsLoading(true);

      const result = await getData(Api.workbookList); //
      if (result.success) {
        const response = result?.data
        // const response = [
        //   {
        //     _id: "XiqoxdFOKX",
        //     name: "Elementary Spanish",
        //   },
        //   {
        //     _id: "f7taeaAsGg",
        //     name: "Elementary French",
        //   },
        //   {
        //     _id: "wGmQH6ECYV",
        //     name: "Elementary English",
        //   },
        //   {
        //     _id: "wGmQH7ECYV",
        //     name: "Middle School English",
        //   },
        // ];
        const tempData = response.map((item) => ({
          label: item?.name,
          value: item?._id,
        }));
        setWorkbooks(tempData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
console.log('contentDetails', contentDetails)
  const updateContent = async (savedDetails) => {
    try {
      // 
      const detailTexts = savedDetails.map(item => item.detailText);
const itemIds = savedDetails.map(item => item.itemIds);
      setIsLoading(true);
      const payload = {
        name: currentLessonDetails?.lessonTitle,
        detailText:detailTexts,
        moduleId :currentLessonDetails?.moduleId,
        itemIds
      };
      const result = await patchData(Api?.updateCMS, payload);

      if (result?.success) {
        showToast(result?.message);
        fetchData()
        setIsLoading(false);
      } else {
        showToast(result?.message, "error");
        setIsLoading(false);

      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [workbookId]);
  useEffect(() => {
    getListData();
  }, []);
  return (
    <PageContainer title="Content Management">
      {
        isLoading?
        <Loader/>:
      <>
      <Box width={"30%"}>
        <CustomSelect
          id="userRole"
          name="userRole"
          label="Select A Workbook"
          displayEmpty
          // disabled={role}
          value={workbookId}
          options={workbooks}
          onChange={(e) => setWorkbookId(e.target.value)}
          // error={
          //   touched.userRole && Boolean(errors.userRole)
          // }
          // helperText={<ErrorMessage name="userRole" />}
        />
      </Box>
      <Grid container spacing={2} padding={2}>
        {/* Left Side: Content Box */}

        <Grid item xs={12} md={3} sx={{ fontSize: 20 }}>
          {lessonsData?.map((lesson, lessonIndex) => (
            <Accordion
              key={lesson.id}
              expanded={expanded === lesson.id}
              onChange={handleChange(lesson.id)}
            >
              <AccordionSummary
                expandIcon={expanded === lesson.id ? "-" : "+"}
                aria-controls={`${lesson.id}-content`}
                id={`${lesson.id}-header`}
              >
                <Typography variant="h6">{lesson.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {lesson.items.map((item, index) => (
                  <Typography
                    component="div"
                    key={index}
                    style={{
                      marginLeft: 5,
                      marginBottom: 10,
                      cursor: "pointer",
                    }}
                    onClick={() => handleChangeLessons(item, lesson.title)}
                  >
                    {`${lessonIndex + 1}.${index + 1} ${item?.name}`}
                  </Typography>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>

        {/* Right Side: Content Box */}
        <Grid item xs={12} md={9}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6">
              {currentLessonDetails?.lessonName}
            </Typography>

            <Box display="flex" justifyContent="space-between" width="100%">
              <Button variant="contained" color="primary">
                Go Back
              </Button>
              <Button variant="contained" color="primary">
                Next
              </Button>
            </Box>

            <TextField
              value={currentLessonDetails?.lessonTitle}
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
                  border: "1px solid #F1F1F1",
                  minHeight: "200px",
                  padding: "10px",
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
      
      <ToastComponent />
      </>
      }
    </PageContainer>
  );
};

export default EditContent;
