using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities
{
    public class Basket : BaseEntity
    {
        public Basket()
        {
            this.BasketGames = new HashSet<BasketGame>();
        }

        public virtual ICollection<BasketGame> BasketGames { get; set; }
        public virtual User User { get; set; }
    }
}
