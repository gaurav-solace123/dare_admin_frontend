import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Grid,
  Skeleton,
} from "@mui/material";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import PageContainer from "src/components/container/PageContainer";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import draftToHtml from "draftjs-to-html";
import CustomSelect from "../../components/forms/theme-elements/CustomSelectField";
import Api from "../../services/constant";
import { getData, patchData } from "../../services/services";
import Loader from "../../components/Loader";
import commonFunc from "../../utils/common";
import useCustomToast from "../../hooks/CustomToastHook";

// Initial content for the editor
const initialContent = "";
const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const EditContent = () => {
  const { showToast, ToastComponent } = useCustomToast();

  const [expanded, setExpanded] = useState(false);
  const [currentLessonsSubtitles, setCurrentLessonsSubtitles] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [currentLessonDetails, setCurrentLessonDetails] = useState({
    lessonName: "",
    lessonTitle: "",
  });
  const [contentDetails, setContentDetails] = useState([]);
  const [workbooks, setWorkbooks] = useState([]);
  const [lessonsData, setLessonsData] = useState([]);
  const [moduleItems, setModuleItems] = useState([]);
  const [workbookId, setWorkbookId] = useState("wGmQH6ECYV");

  const onChangeWorkbook = (event) => {
    setWorkbookId(event.target.value);
    setCurrentLessonDetails({
      lessonName: "",
      lessonTitle: "",
    });
    setContentDetails([]);
    setEditorState(
      EditorState.createWithContent(ContentState.createFromText(initialContent))
    );
  };
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
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [rootLessonIndex, setRootLessonIndex] = useState(0);
  const handleChangeEditorState = (tempContent) => {
    const htmlContent = commonFunc.generateHTMLContent(tempContent);

    const blocksFromHTML = convertFromHTML(htmlContent);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(contentState));
  };
 
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
  const handleChangeLessons = (
    item,
    lessonNo = currentLessonDetails?.lessonName
  ) => {
    setCurrentLessonDetails({
      lessonName: lessonNo,
      lessonTitle: item?.name,
      moduleId: item?.objectId,
    });

    const tempContent = moduleItems.filter(
      (element) =>
        element?._p_module === `Module$${item?.objectId}` && element?.detailText
    );
    setContentDetails(tempContent);
    handleChangeEditorState(tempContent);
    
  };
  const handleSave = () => {
    if (editorState) {
      debugger
      const savedDetails = contentDetails.map((item) => ({
        detailText: item.detailText,
        itemIds: item._id,
      }));

      updateContent(savedDetails);
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
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = response.data;
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

  const getCMSDetails = async () => {
debugger
    const searchQuery=`?workbookId=${workbookId}`
    try {
      setIsLoading(true);

      const result = await getData(`${Api.cmsDetails}${searchQuery}`); //
      if (result?.success) {
        let tempData = result?.data?.lessons.map((item) => ({
          id: item?.name,
          lessonId: item?._id,
          title: item?.name,
        }));

        const updatedTempDataArray = tempData?.map((tempData, tempIndex) => {
          // debugger
          const filteredItems = result?.data?.modules
            .filter((mod) => mod._p_lesson === `Lesson$${tempData.lessonId}`) // Filter by lessonId
            .map((mod) => ({
              objectId: mod._id,
              name: mod.name,
            }));

          return {
            ...tempData,
            items: filteredItems, // Replace items with filtered array of objectId and name
          };
        });

        setLessonsData(updatedTempDataArray);
        
        setModuleItems(result?.data?.moduleItems);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  const getListData = async () => {
    try {
      setIsLoading(true);

      const result = await getData(Api.workbookList); //
      if (result.success) {
        const response = result?.data;
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
  console.log("contentDetails", contentDetails);
  const handleGoBack = () => {
    if (currentLessonIndex > 0) {
      // Navigate within the current lesson subtitles
      const prevLesson = currentLessonsSubtitles[currentLessonIndex - 1];
      setCurrentLessonIndex(currentLessonIndex - 1);
      handleChangeLessons(prevLesson);
    } else if (rootLessonIndex > 0) {
      // Go to the previous root lesson when at the first subtitle
      const prevRootLesson = lessonsData[rootLessonIndex - 1];
      setRootLessonIndex(rootLessonIndex - 1);
      setCurrentLessonsSubtitles(prevRootLesson.items);

      const lastSubtitle =
        prevRootLesson.items[prevRootLesson.items.length - 1];
      setCurrentLessonIndex(prevRootLesson.items.length - 1);

      handleChangeLessons(lastSubtitle, prevRootLesson.title);
    }
  };

  const handleNext = () => {
    if (currentLessonIndex < currentLessonsSubtitles.length - 1) {
      const nextLesson = currentLessonsSubtitles[currentLessonIndex + 1];

      setCurrentLessonIndex(currentLessonIndex + 1);
      handleChangeLessons(nextLesson);
    } else {
      setCurrentLessonIndex(0);
      const nextLesson = lessonsData[rootLessonIndex + 1];
      setRootLessonIndex(rootLessonIndex + 1);

      setCurrentLessonsSubtitles(nextLesson.items);
      handleChangeLessons(nextLesson.items[0], nextLesson.title);
    }
  };
  const updateContent = async (savedDetails) => {
    try {
      //
      const detailTexts = savedDetails.map((item) => item.detailText);
      const itemIds = savedDetails.map((item) => item.itemIds);
      setIsLoading(true);
      const payload = {
        name: currentLessonDetails?.lessonTitle,
        detailText: detailTexts,
        moduleId: currentLessonDetails?.moduleId,
        itemIds,
      };
      const result = await patchData(Api?.updateCMS, payload);

      if (result?.success) {
        showToast(result?.message);
        // fetchData();
        getCMSDetails()
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
    // fetchData();
    getCMSDetails()
  }, [workbookId]);
  useEffect(() => {
    getListData();
  }, []);
  return (
    <PageContainer title="Content Management">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* {currentLessonDetails?.lessonName&&
         <Typography variant="h6" textAlign={'center'}>
                  {currentLessonDetails?.lessonName}
                </Typography>} */}

          <Grid container spacing={2} padding={2}>
            {/* Left Side: Content Box */}

            <Grid item xs={12} md={3} sx={{ fontSize: 20 }}>
              <Box mb={"10px"}>
                <CustomSelect
                  id="userRole"
                  name="userRole"
                  label="Select A Workbook"
                  displayEmpty
                  value={workbookId}
                  options={workbooks}
                  onChange={onChangeWorkbook}
                />
              </Box>

              {lessonsData.length > 0 ? (
                lessonsData.map((lesson, lessonIndex) => (
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
                          onClick={() => {
                            setCurrentLessonsSubtitles(lesson.items);
                            handleChangeLessons(item, lesson.title);
                            setCurrentLessonIndex(index);
                            setRootLessonIndex(lessonIndex);
                          }}
                        >
                          {`${lessonIndex + 1}.${index + 1} ${item?.name}`}
                        </Typography>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ))
              ) : (
                // Skeleton loader to fill the blank space
                <Box>
                  {skeletonArray.map((skeletonIndex) => (
                    <Accordion key={skeletonIndex}>
                      <AccordionSummary>
                        <Skeleton variant="text" width="80%" height={40} />
                      </AccordionSummary>
                      <AccordionDetails>
                        <Skeleton variant="text" width="90%" />
                        <Skeleton variant="text" width="90%" />
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              )}
            </Grid>
            {/* Right Side: Content Box */}

            <Grid item xs={12} md={9}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h6">
                  {currentLessonDetails?.lessonName}
                </Typography>

                <Box display="flex" justifyContent="space-between" width="100%">
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={currentLessonIndex === 0 && rootLessonIndex === 0}
                    onClick={handleGoBack}
                  >
                    Go Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={
                      (currentLessonIndex ===
                        currentLessonsSubtitles.length - 1 &&
                        rootLessonIndex === lessonsData.length - 1) ||
                      currentLessonDetails.lessonName === ""
                    }
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </Box>

                <TextField
                  value={currentLessonDetails?.lessonTitle}
                  onChange={handleTitleChange}
                  variant="outlined"
                  disabled={currentLessonDetails.lessonName === ""}
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
                   
                    readOnly={currentLessonDetails.lessonName === ""}
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
                  disabled={currentLessonDetails.lessonName === ""}
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
      )}
    </PageContainer>
  );
};

export default EditContent;
