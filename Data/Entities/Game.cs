using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities
{
    public class Game : BaseEntity
    {
        public Game()
        {
            this.Comments = new HashSet<Comment>();
            this.BasketGames = new HashSet<BasketGame>();
            this.Baskets = new HashSet<Basket>();
            this.Genres = new HashSet<Genre>();
            this.Marks = new HashSet<Mark>();
        }

        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime ReleaseDate { get; set; }
        public int Price { get; set; }
        public int Discount { get; set; }
        public string Cover { get; set; } 
        public virtual ICollection<Mark> Marks { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<BasketGame> BasketGames { get; set; }
        public virtual ICollection<Basket> Baskets { get; set; }
        public virtual ICollection<Genre> Genres { get; set; }
    }
}
