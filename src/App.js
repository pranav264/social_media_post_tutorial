import { pink } from '@mui/material/colors';
import './App.css';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Divider, IconButton, List, ListItem, TextField, Typography, styled } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';

function App() {
  const post = {
    username: "pranav256",
    title: "Creating A Social Media Post",
    text: "This is a tutorial that uses React JS and Material UI to build a social media post",
    date: new Date().toDateString(),
    image: "https://media.licdn.com/dms/image/D4D03AQGdjzhaQl702w/profile-displayphoto-shrink_800_800/0/1669441133257?e=1695254400&v=beta&t=ZqdCdOcZkpgUM8UnEij8cEwGjGeUI2ZXUtD6p0MZCgI"
  }

  const [like, setLike] = useState(false);
  const [likeColor, setLikeColor] = useState("");
  const [expand, setExpand] = useState(false);
  const [comment, setComment] = useState("");

  const handleLike = () => {
    const totalLikes = parseInt(localStorage.getItem("totalLikes"))
    if(like === true) {
      setLike(false);
      setLikeColor("");
      localStorage.setItem("totalLikes", totalLikes - 1);
    }
    else if(like === false) {
      setLike(true);
      setLikeColor("#2196f3");
      localStorage.setItem("totalLikes", totalLikes + 1);
    }
  }

  const fontFamily = "'Roboto', sans-serif";

  const style = {
    card: { maxWidth: 300, margin: "auto", marginTop: "10rem", fontFamily: fontFamily },
    avatar: { backgroundColor: pink[400] },
    like: { color: likeColor },
    comment: { marginLeft: "auto" },
    collapse: { padding: "20px" }
  }

  const setInitialValues = () => {
    if(localStorage.getItem("totalLikes") === null) {
      localStorage.setItem("totalLikes", 0);
    }
    if(localStorage.getItem("comments") === null) {
      localStorage.setItem("comments", '[]');
    }
  }

  const handleExpand = () => {
    setExpand(!expand);
  }

  const addComment = () => {
    const comments = JSON.parse(localStorage.getItem("comments"));
    comments.push(comment);
    localStorage.setItem("comments", JSON.stringify(comments));
    setComment("");
  }

  const Comments = ({comments}) => {
    return (
      <>
        <List>
          {comments?.map((comment, index) => {
            return (
              <>
              <ListItem key={index}>
                {comment}
              </ListItem>
              <Divider />
              </>
            )
          })}
        </List>
      </>
    )
  }

  useEffect(() => {
    setInitialValues();
  },[])

  return (
    <>
      <Card sx={style.card}>
        <CardHeader
          avatar={
            <Avatar sx={style.avatar}>{post.username[0].toUpperCase()}</Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={post.title}
          subheader={post.date}
        />
        <CardMedia
          component="img"
          height="194"
          image={post.image}
          alt="Card Media"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.text}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {localStorage.getItem("totalLikes")} Likes
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={handleLike}>
            <ThumbUpIcon sx={style.like} />
          </IconButton>
          <IconButton
            style={style.comment}
            onClick={handleExpand}
          >
            <CommentIcon />
          </IconButton>
        </CardActions>
        <Collapse sx={style.collapse} in={expand} timeout="auto" unmountOnExit>
          <CardContent>
          <div className="add-comment">
            <TextField id="standard-basic" placeholder="Comment" variant="standard" value={comment} onChange={(e) => setComment(e.target.value)} />
            <button className="add-comment-btn" onClick={addComment}><AddIcon color="action" /></button>
          </div>
          <Comments comments={JSON.parse(localStorage.getItem("comments"))} />
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}

export default App;
