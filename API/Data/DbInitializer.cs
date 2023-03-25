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
            };
            
            foreach (var post in posts)
            {
                context.Posts.Add(post);
            }

            context.SaveChanges();
        }
    }
}