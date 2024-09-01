import * as React from 'react';
// eslint-disable-next-line no-unused-vars
import { formatUnicorn } from "format-unicorn";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { QRCodeCanvas } from 'qrcode.react';

const QrPaper = styled(Paper)(({ theme }) => ({
    // width: 120,
    // height: 120,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
  }));


export default function QrCode() {
    const ref = React.useRef();
    const location = (
        window.location.protocol + "//" + window.location.host
        + "/play/{wall_hash}".formatUnicorn({wall_hash: window.wall_hash})
    );
    const [computedWidth, setComputedWidth] = React.useState();
  
    React.useEffect(()=>{
      calculateQRWidth(window.innerWidth)
      window.addEventListener(
        'resize',
        ()=>calculateQRWidth(window.innerWidth)
      );
    },[]);
  
    const calculateQRWidth = (innerWidth) => {
      let maxWidth = innerWidth * 11/16;
      setComputedWidth(Math.min(maxWidth, 500));
    }
  
    return (
      <QrPaper>
        <div id="qr-code-canvas" className="qr-code-canvas">
        <QRCodeCanvas
            itemRef={ref}
            value={location}
            size={computedWidth}
            level='H'
            includeMargin={true}
            // imageSettings={
            // (computedWidth < 72 * 3)
            // ? null
            // : {
            //     src:"/static/react/clover-72x72.png",
            //     height: `${Math.min(computedWidth/10, 72)}`,
            //     width: `${Math.min(computedWidth/10, 72)}`,
            //     excavate:true,
            // }
            // }
        />
        </div>
        <Typography variant='body1' align='center'>
        <Link color="inherit" href={location}>
          {location}
        </Link>
        </Typography>
      </QrPaper>
    );
  }
  