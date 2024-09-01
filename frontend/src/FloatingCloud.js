import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { TagCloud } from 'react-tagcloud'

const WordPaper = styled(Paper)(({ theme }) => ({
    // width: 120,
    // height: 120,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
  }));

export default function FloatingCloud({wall_id = "test"}) {
  const [words, setWords] = React.useState([]);

  React.useEffect(()=>{
    // Load Requisites when page Completes
    getWords();
    setInterval(getWords, 1000);
  },[]);


  const getWords = () => {
    // Call the API
    fetch(`/api/v1/words/${wall_id}`)
   .then(response => {
       if (!response.ok) {
           throw new Error("HTTP error " + response.status);
       }
       return response.json();
   })
   .then(json => {
       setWords(json);
   })
   .catch(function () {
       console.error(`Failed to load words for ${wall_id}`)
   })
  }

  return (
    <>
      <WordPaper variant="elevation" elevation={6}>
        <TagCloud
            minSize={20}
            maxSize={64}
            tags={words}
        />
      </WordPaper>
    </>
  )
}