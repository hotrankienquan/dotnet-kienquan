using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string PictureUrl { get; set; }

        public int Status { get; set; }

        public bool Hot { get; set; }
        public string PublicId { get; set; }
  }
}