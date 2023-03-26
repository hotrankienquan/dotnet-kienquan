using API.Entities;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context)
        {
            if (context.Posts.Any()) return;

            var posts = new List<Post>
            {
                new Post
                {
                    Title = "title post 1",
                    Content =
                        "content post 1",
                    PictureUrl = "/images/posts/title-post-1.png",
                    Status = 1,
                    Hot = true
                },
                new Post
                {
                    Title = "title post 2",
                    Content =
                        "content post 2",
                    PictureUrl = "/images/posts/title-post-2.png",
                    Status = 2,
                    Hot = false
                },
                new Post
                {
                    Title = "title post 3",
                    Content =
                        "content post 3",
                    PictureUrl = "/images/posts/title-post-2.png",
                    Status = 2,
                    Hot = false
                },
                new Post
                {
                    Title = "title post 4",
                    Content =
                        "content post 4",
                    PictureUrl = "/images/posts/title-post-2.png",
                    Status = 2,
                    Hot = false
                },
                new Post
                {
                    Title = "title post 5",
                    Content =
                        "content post 5",
                    PictureUrl = "/images/posts/title-post-2.png",
                    Status = 2,
                    Hot = false
                },
                new Post
                {
                    Title = "title post 6",
                    Content =
                        "content post 6",
                    PictureUrl = "/images/posts/title-post-2.png",
                    Status = 2,
                    Hot = false
                },
                new Post
                {
                    Title = "title post 7",
                    Content =
                        "content post 7",
                    PictureUrl = "/images/posts/title-post-2.png",
                    Status = 2,
                    Hot = false
                },
                new Post
                {
                    Title = "title post 8",
                    Content =
                        "content post 8",
                    PictureUrl = "/images/posts/title-post-2.png",
                    Status = 2,
                    Hot = false
                },
                new Post
                {
                    Title = "title post 9",
                    Content =
                        "content post 9",
                    PictureUrl = "/images/posts/title-post-2.png",
                    Status = 2,
                    Hot = false
                },
                new Post
                {
                    Title = "title post 10",
                    Content =
                        "content post 10",
                    PictureUrl = "/images/posts/title-post-2.png",
                    Status = 2,
                    Hot = false
                },
                new Post
                {
                    Title = "title post 11",
                    Content =
                        "content post 11",
                    PictureUrl = "/images/posts/title-post-2.png",
                    Status = 2,
                    Hot = false
                },
                new Post
                {
                    Title = "title post 12",
                    Content =
                        "content post 12",
                    PictureUrl = "/images/posts/title-post-2.png",
                    Status = 2,
                    Hot = false
                },
            };
            
            foreach (var post in posts)
            {
                context.Posts.Add(post);
            }

            context.SaveChanges();
        }
    }
}