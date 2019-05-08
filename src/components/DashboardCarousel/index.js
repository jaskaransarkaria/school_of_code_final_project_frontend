import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import css from "../DashboardCarousel/DashboardCarousel.module.css";

function DashboardCarousel(props) {
  return (
    <>
      <Button size="small" color="primary">
        LEFT
      </Button>
      <div className={css.cardContainer}>
        <Card className={css.card}>
          <CardActionArea>
            {/* <CardMedia
          component="img"
          alt="Contemplative Reptile"
          className={css.media}
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        /> */}
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Lizard
              </Typography>
              <Typography component="p">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>

      <Button size="small" color="primary">
        RIGHT
      </Button>
    </>
  );
}

DashboardCarousel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default DashboardCarousel;
