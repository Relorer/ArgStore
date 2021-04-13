using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities
{
    public class Game : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime ReleaseDate { get; set; }
        public int Price { get; set; }
        public int PriceIncludingDiscount { get; set; }
        public string CoverPath { get; set; } 
        public Rating Rating { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public ICollection<Genre> Genres { get; set; }
    }
}
