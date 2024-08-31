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
 
const testWords = [
  {
    value: 'told',
    count: 64,
  },
  {
    value: 'mistake',
    count: 11,
  },
  {
    value: 'thought',
    count: 16,
  },
  {
    value: 'bad',
    count: 17,
  },
]

export default function FloatingCloud({
  words = testWords,
}) {

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