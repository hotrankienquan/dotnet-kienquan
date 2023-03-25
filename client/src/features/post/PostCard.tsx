import { Card, CardHeader, Avatar, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Post } from "../../app/models/Post";
interface Props {
  post: Post;
}
export default function PostCard({ post }: Props) {
  return (
      <Card>
          <CardHeader
              avatar={
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                      {post.title.charAt(0).toUpperCase()}
                  </Avatar>
              }
              title={post.title}
              titleTypographyProps={{
                  sx: { fontWeight: 'bold', color: 'primary.main' }
              }}
          />
          <CardMedia
              sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
              image={post.pictureUrl}
              title={post.title}
          />
          <CardActions>
              <Button component={Link} to={`/post/${post.id}`}  size="small">View</Button>
          </CardActions>
      </Card>
  )
}