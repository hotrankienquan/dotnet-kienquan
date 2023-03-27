using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.DTOs
{
    public class UpdatePostDto
    {
        public int Id { get; set; }

         [Required]
        public string Title { get; set; }

        [Required]
        [Column(TypeName = "ntext")]
        public string Content { get; set; }

        
        public IFormFile File { get; set; }

        [Required]
        public int Status { get; set; }

        [Required]
        public bool Hot { get; set; }
    }
}