using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities
{
    public class PurchaseHistory : BaseEntity
    {
        public ICollection<PurchasedGame> PurchasedGame { get; set; }
        public virtual User User { get; set; }
    }
}
