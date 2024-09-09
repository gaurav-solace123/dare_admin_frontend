import React,{lazy, useEffect, useRef, useState} from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';

import { Badge, Button, Drawer, Grid, IconButton, Modal, Typography } from '@mui/material';
import InstructorTable from './component/InstructorTable';
import InstructorForm from './component/InstructorForm';



const headCells = [
  { id: 'firstName', numeric: false, label: 'Name' },
  { id: 'userRole', numeric: true, label: 'Role' },
  { id: 'mobileNumber', numeric: true, label: 'Mobile' },
  { id: 'email', numeric: true, label: 'Email' },
  { id: 'username', numeric: true, label: 'Username' },
  { id: 'actions', numeric: true, label: 'Actions' },
];

const listData=[
  {
    "isIntialized": false,
    "street_1": null,
    "street_2": null,
    "city": null,
    "state": null,
    "_postal_code": null,
    "mobileNumber": null,
    "_id": "03LjZPC1EG",
    "email": "jacobshannon@k12.nj.us",
    "userRole": "Student",
    "firstName": "jacob",
    "lastName": "shannon",
    "username": "jacobshannon",
    "accountApproved": true,
    "isInitialized": true,
    "displayName": "jacob shannon",
    "_hashed_password": "$2a$10$hK1qH7KYByoA69BaO/hnMu6o5jTH/Ov8JiPcPXRgFrc4/F8S42BK2",
    "_email_verify_token": "0C8ZC7IjcfKLGyVYfYhpMHWnf",
    "emailVerified": false,
    "_wperm": [
      "03LjZPC1EG"
    ],
    "_rperm": [
      "*",
      "03LjZPC1EG"
    ],
    "_acl": {
      "03LjZPC1EG": {
        "w": true,
        "r": true
      },
      "*": {
        "r": true
      }
    },
    "_created_at": "2016-10-11T19:06:41.947Z",
    "_updated_at": "2016-10-11T20:18:50.539Z"
  },
  {
    "isIntialized": false,
    "street_1": null,
    "street_2": null,
    "city": null,
    "state": null,
    "_postal_code": null,
    "mobileNumber": null,
    "_id": "03Qh6HMrTF",
    "userRole": "Student",
    "firstName": "Adair",
    "lastName": "Wilson",
    "username": "aw12911",
    "accountApproved": true,
    "isInitialized": true,
    "displayName": "Adair Wilson",
    "_hashed_password": "$2a$10$vF4i8.sAahguvPqPysFF7.blPiKLLWZyo2VSpfcsckSqwTP8gZRnK",
    "_wperm": [
      "03Qh6HMrTF"
    ],
    "_rperm": [
      "*",
      "03Qh6HMrTF"
    ],
    "_acl": {
      "03Qh6HMrTF": {
        "w": true,
        "r": true
      },
      "*": {
        "r": true
      }
    },
    "_created_at": "2016-09-22T19:15:55.455Z",
    "_updated_at": "2016-09-22T19:16:04.702Z"
  },
  {
    "isIntialized": false,
    "street_1": null,
    "street_2": null,
    "city": null,
    "state": null,
    "_postal_code": null,
    "mobileNumber": null,
    "_id": "00q9uUmYWj",
    "userRole": "Student",
    "firstName": "Kennadie",
    "lastName": "Ruot",
    "username": "kruot",
    "accountApproved": true,
    "isInitialized": true,
    "displayName": "Kennadie Ruot",
    "_hashed_password": "$2a$10$RxpwZFUOl8DfpFKZU6Ag3O.PGbTT4x.P7nLx7pP3xrfw5m4ZWObfa",
    "_wperm": [
      "00q9uUmYWj"
    ],
    "_rperm": [
      "*",
      "00q9uUmYWj"
    ],
    "_acl": {
      "00q9uUmYWj": {
        "w": true,
        "r": true
      },
      "*": {
        "r": true
      }
    },
    "_created_at": "2017-02-01T20:58:48.510Z",
    "_updated_at": "2017-02-01T20:58:58.636Z"
  },
  {
    "isIntialized": false,
    "street_1": null,
    "street_2": null,
    "city": null,
    "state": null,
    "_postal_code": null,
    "mobileNumber": null,
    "_id": "00Ja31wGW1",
    "userRole": "Student",
    "firstName": "Dahmari",
    "lastName": "Hayes",
    "username": "dhaye06",
    "accountApproved": true,
    "isInitialized": true,
    "displayName": "Dahmari Hayes",
    "_hashed_password": "$2a$10$XWuJ27n2KdV7DuTTGQJXW.Vcy3GZiNeUN7HuCc92LNnKeo6qVFC36",
    "_wperm": [
      "00Ja31wGW1"
    ],
    "_rperm": [
      "*",
      "00Ja31wGW1"
    ],
    "_acl": {
      "00Ja31wGW1": {
        "w": true,
        "r": true
      },
      "*": {
        "r": true
      }
    },
    "_created_at": "2017-03-13T12:19:04.321Z",
    "_updated_at": "2017-03-13T12:19:13.122Z"
  },
  {
    "isIntialized": false,
    "street_1": null,
    "street_2": null,
    "city": null,
    "state": null,
    "_postal_code": null,
    "mobileNumber": null,
    "_id": "01GRdoBd3W",
    "email": "jonesa@students.romuluscsd.org",
    "userRole": "Student",
    "firstName": "Aidan",
    "lastName": "Jones",
    "username": "jonesa",
    "accountApproved": true,
    "isInitialized": true,
    "displayName": "Aidan Jones",
    "_hashed_password": "$2a$10$mhKEfflgclhJrIYRoYrEQuxBOLXWx4B9aMlnPE9dUwRJsLzmMlkda",
    "_email_verify_token": "iEmTYOf2Oo6wA5nDNIBfC4ACw",
    "emailVerified": false,
    "_wperm": [
      "01GRdoBd3W"
    ],
    "_rperm": [
      "*",
      "01GRdoBd3W"
    ],
    "_acl": {
      "01GRdoBd3W": {
        "w": true,
        "r": true
      },
      "*": {
        "r": true
      }
    },
    "_created_at": "2017-02-08T19:05:21.953Z",
    "_updated_at": "2017-02-08T19:06:11.154Z"
  }
]

function InstructorManagement() {
  const [openRightBar, setOpenRightBar] = useState(false);
  const onEditClick=(data)=>{
    console.log("onEdit",data)
    setOpenRightBar(true)
    }
    const handleClose = () => {
      setOpenRightBar(false);
    };
  
  return (
    <div>
      <Box sx={{ border: '2px solid', color:'#0055a4',padding: 3, position: 'relative' ,borderRadius:2}}>

<Box
        sx={{
          position: 'absolute',
          top: '-12px', // Adjust this to make the text overlap more or less with the border
          left: '16px',
          backgroundColor: '#fff',
          padding: '0 8px',
          display: 'inline-block',
          // color: 'red', // To match the border color
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
          <Typography variant="h7" fontWeight={600} component="label" htmlFor="mailingAddress">Instructor Management</Typography>
      </Box>
<InstructorTable
headers={headCells} 
page={0}
listData={listData}
totalCount={78827}
rowsPerPage={5}
onEditClick={onEditClick}
/>
    </Box>
    <Drawer anchor={'right'} open={openRightBar} onClose={handleClose}>
    <Box
      sx={{ width:'500px' }}
      role="presentation"
    //   onClick={toggleDrawer(anchor, false)}
    //   onKeyDown={toggleDrawer(anchor, false)}
    >
<InstructorForm/>
    </Box>
      </Drawer>
    </div>
  )
}

export default InstructorManagement