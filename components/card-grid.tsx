
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
import { ReactNode } from 'react';

const handleChange = () => { }

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 200,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));


interface ICardGridProps {
  count: number;
  builder: (index: number) => ReactNode;
}
const CardGrid = ({count, builder}: ICardGridProps) => {

  const classes = useStyles();
  const spacing = 2;

  return (
    <div>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {count ? Array.apply(0, {length: count}).map((_, index) => (
              <Grid key={index} item>
                {builder(index)}
              </Grid>
            )) : <div></div>}
          </Grid>
        </Grid>

      </Grid>

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

export default CardGrid;