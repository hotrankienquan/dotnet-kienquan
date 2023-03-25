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
                    Name = "Angular Speedster Board 2000",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    PictureUrl = "/images/posts/sb-ang1.png",
                },
                new Post
                {
                    Name = "bai viet 1",
                    Description = "Mô tả bài viết 1",
                    PictureUrl = "/images/posts/anh-post-1.png",
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