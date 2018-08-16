import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { timestampToDate, firebaseTimestampToDateFormat } from '../../helpers/populateArticles'
import { Link } from 'react-router-dom';
import { truncateWithEllipses } from '../../helpers/eventHelpers'
import MediaQuery from 'react-responsive';

import ResponsiveDialog from '../blocks/ResponsiveDialog';

const styles = theme => {
  return {
    root: {
      maxWidth: 716,
      width: 716,
      height: 254,
      display: "flex",
      flexDirection: "row",
      borderRadius: 4,
      backgroundColor: "#ffffff",
      border: "solid 1px rgba(0, 0, 0, 0.12)",
      '@media (max-width: 1023px)': {
        width: 344,
        height: 384,
        flexDirection: "column",
        margin: '0 auto',
      }
    },
    media: {
      height: 254,
      width: 254,
      '@media (max-width: 1023px)': {
        width: 344,
        height: 194,
      }
    },
    dialogMedia: {
      height: 254,
      width: '100%',
      '@media (max-width: 1023px)': {
        width: '100%',
        height: 194,
      }
    },
    modalCardBody: {
      width: "100%",
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      margin: 0,
    },
    rightContainer: {
      width: 413,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      '@media (max-width: 1023px)': {
        width: 312,
        height: 190,
      }
    },
    cardBody: {
      width: "100%",
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 24,
      paddingRight: 24,
      margin: 0,
    },
    articleSource: {
      marginTop: 16,
      fontFamily: "Roboto",
      fontSize: 12,
      fontWeight: 500,
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: 1.33,
      letterSpacing: 2,
      color: "rgba(0, 0, 0, 0.87)",
      textTransform: 'uppercase'
    },
    articleDate: {
      marginTop: 16,
      fontFamily: "Roboto",
      fontSize: 12,
      fontWeight: 500,
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: 1.33,
      letterSpacing: 2,
      color: "rgba(0, 0, 0, 0.87)",
      textTransform: 'uppercase'
    },
    artistName: {
      fontSize: 12,
      fontWeight: 500,
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: 1.33,
      letterSpacing: 2,
      color: "#6200ee",
      textTransform: 'capitalize'
    },
    headline: {
      marginTop: 5,
      fontFamily: "Roboto",
      fontSize: 20,
      fontWeight: 500,
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: "normal",
      letterSpacing: 0.3,
      color: "rgba(0, 0, 0, 0.87)",
    },
    articleBody: {
      marginTop: 22,
      fontFamily: "Roboto",
      fontSize: 14,
      fontWeight: "normal",
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: 1.43,
      letterSpacing: 0.3,
      color: "rgba(0, 0, 0, 0.6)",
      '@media (max-width: 1023px)': {
        marginTop: 0,
      }
    },
    articleLink: {
      height: 16,
      marginTop: 70,
      marginBottom: 18,
      fontFamily: "Roboto",
      fontSize: 14,
      fontWeight: 500,
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: 1.14,
      letterSpacing: 1.3,
      textAlign: "center",
      textTransform: "uppercase",
      color: "#6200ee",
      cursor: "pointer",
      '@media (max-width: 1023px)': {
        marginTop: 30,
      }
    }
  };
};

class ArticleCard extends React.Component {
  constructor() {
    super();
    this.state = {
      readMore: false,
    };
  }
  render() {
    const { classes, article } = this.props;
    const { readMore } = this.state;
    let formattedDate = article.date ? timestampToDate(article.date) : '';

    console.debug('article: ', article);

    return (
      <div>
        <Card classes={ {root: classes.root} }>
          <MediaQuery minWidth={1024}>
            <CardMedia
            classes={ {root: classes.media} }
            image={ article.image || "https://placeholder.com/254x254" }
            title={article.title}
            />
          </MediaQuery>
          <MediaQuery maxWidth={1023}>
            <CardMedia
              classes={ {root: classes.media} }
              image={ article.image || "https://placeholder.com/344x194" }
              title={article.title}
              />
          </MediaQuery>
          <div className={classes.rightContainer}>
            <CardContent className={classes.cardBody}>
              <Typography gutterBottom variant="headline" component="p" className={classes.articleSource}>
                { `via ${ article.source } · `}
                <span className={classes.articleDate}>
                  { `${ formattedDate }`}
                </span>
                <MediaQuery minWidth={1024}> · </MediaQuery>
                <MediaQuery maxWidth={1023}><br/></MediaQuery>
                <span>
                  <Link to={`/Artist/${encodeURI(article.artist)}`} className={classes.artistName}>
                    { article.artist }
                  </Link>
                </span>
              </Typography>
              <Typography gutterBottom variant="headline" component="h2" className={classes.headline}>
                { article.title }
              </Typography>
              <Typography component="p" className={ classes.articleBody }>

              </Typography>
            </CardContent>
            <CardActions className={ classes.cardBody }>
              <Typography
                component="a"
                className={ classes.articleLink }
                onClick={this.toggleReadMore.bind(this)}
              >
                Read More
              </Typography>
            </CardActions>
          </div>
        </Card>

        {/* Responsive dialog with full article text which opens by click on Read More */}
        <ResponsiveDialog
          onClose={this.toggleReadMore}
          isOpen={readMore}
          data={article}
        >
          <MediaQuery minWidth={1024}>
            <CardMedia
            classes={ {root: classes.dialogMedia} }
            image={ article.image || "https://placeholder.com/254x254" }
            title={article.title}
            />
          </MediaQuery>
          <MediaQuery maxWidth={1023}>
            <CardMedia
              classes={ {root: classes.dialogMedia} }
              image={ article.image || "https://placeholder.com/344x194" }
              title={article.title}
              />
          </MediaQuery>
          <div className={classes.modalContainer}>
            <CardContent className={classes.modalCardBody}>
              <Typography gutterBottom variant="headline" component="p" className={classes.articleSource}>
                { `via ${ article.source } · `}
                <span className={classes.articleDate}>
                  { `${ formattedDate }`}
                </span>
                <MediaQuery minWidth={1024}> · </MediaQuery>
                <MediaQuery maxWidth={1023}><br/></MediaQuery>
                <span>
                  <Link to={`/Artist/${encodeURI(article.artist)}`} className={classes.artistName}>
                    { article.artist }
                  </Link>
                </span>
              </Typography>
              <Typography gutterBottom variant="headline" component="h2" className={classes.headline}>
                { article.title }
              </Typography>
              <Typography component="div" className={ classes.articleBody }>
                <div dangerouslySetInnerHTML={this.createMarkup(article.content)} />
              </Typography>
            </CardContent>
          </div>
        </ResponsiveDialog>
      </div>
    );
  }

  createMarkup = (content) => {
    return { __html: content };
  };

  toggleReadMore = () => {
    this.setState({ readMore: !this.state.readMore });
  };
}

ArticleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArticleCard);