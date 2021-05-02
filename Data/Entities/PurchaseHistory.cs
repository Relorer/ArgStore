using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities
{
    public class PurchaseHistory : BaseEntity
    {
        public PurchaseHistory()
        {
            this.PurchasedGame = new HashSet<PurchasedGame>();
        }

        public virtual ICollection<PurchasedGame> PurchasedGame { get; set; }
        public virtual User User { get; set; }
    }
}
