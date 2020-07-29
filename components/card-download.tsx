
import { useRouter } from 'next/router'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { FunctionComponent } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IDownload } from '../interfaces/interfaces';

const handleChange = () => { }

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    card: {
    },
    progress: {
        position: 'absolute',
    },
}));

interface IDownloadCardProps {
    download: IDownload;
    width?: number;
}
const CardDownload: FunctionComponent<IDownloadCardProps> = ({ download, width }) => {

    const classes = useStyles();


    return (<div>
        <Card className={classes.card} style={{maxWidth: width ?? 140}}>
            <CardActionArea>
<CircularProgress className={classes.progress} variant="static" value={75} thickness={6} 
                    size={(width ?? 140) / 3}/>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height={(width ?? 140) * (1 / 0.690)}
                    image={download.image}
                    title="Contemplative Reptile"
                > 
                </CardMedia>
                
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards {download.files.length}
                      </Typography>
                </CardContent>
            </CardActionArea>
          
        </Card>


        <style jsx>{`
      .cover {
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
       root: {
        flexGrow: 1;
      },
      paper: {
        height: 140px;
        width: 100px:
      },
      control: {
        padding: 16px,
      }
    `}</style>




    </div>
    );
}

export default CardDownload;