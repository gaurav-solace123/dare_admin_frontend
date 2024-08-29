import { border, borderColor, color, fontFamily, textAlign } from "@mui/system";

const typography = {
  fontFamily: "'Plus Jakarta Sans', sans-serif;",
  h1: {
    fontWeight: 600,
    fontSize: '2.25rem',
    lineHeight: '2.75rem',
    fontFamily: "'Plus Jakarta Sans', sans-serif;",
  },
  h2: {
    fontWeight: 600,
    fontSize: '1.875rem',
    lineHeight: '2.25rem',
    fontFamily: "'Plus Jakarta Sans', sans-serif;",
  },
  h3: {
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: '1.75rem',
    fontFamily: "'Plus Jakarta Sans', sans-serif;",
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.3125rem',
    lineHeight: '1.6rem',
  },
  h5: {
    fontFamily:"Stamped",
    fontWeight: 600,
    fontSize: '1.125rem',
    lineHeight: '1.6rem',
  },
  tableHead:{
// color:"white",
fontSize: '1.125rem',
fontWeight: 900,
textAlign:"center",
borderColor:'#bce8f1',
border:'3px'
  },
  tableText:{
    fontWeight: 400,
    fontSize: '1rem',
  },
  h6: {
    fontWeight: 600,
    fontSize: '1.2rem',
    lineHeight: '1.2rem',
  },
  tableTitle: {
    fontWeight: 800,
    fontSize: '1.5rem',
    lineHeight: '1.2rem',
  },
  button: {
    textTransform: 'capitalize',
    fontWeight: 400,
  },
  body1: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: '1.334rem',
  },
  body2: {
    fontSize: '0.75rem',
    letterSpacing: '0rem',
    fontWeight: 400,
    lineHeight: '1rem',
  },
  subtitle1: {
    fontSize: '0.875rem',
    fontWeight: 'bold',
    color:'grey',

  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 400,
  },
};

export default typography;
