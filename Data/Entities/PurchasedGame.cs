using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities
{
    public class PurchasedGame : BaseEntity
    {
        public int Price { get; set; }
        public DateTime Date { get; set; }
        public Game Game { get; set; }
        public virtual PurchaseHistory PurchaseHistory { get; set; }
    }
}
