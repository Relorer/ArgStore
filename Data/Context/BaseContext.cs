using Data.Entities;
using System.Data.Entity;

namespace Data.Context
{
    public class BaseContext : DbContext
    {
        private const string BaseName = "ARGSTORE";

        public BaseContext() : base(BaseName)
        {
            Database.SetInitializer(new BaseInitializer());
        }

        public DbSet<Basket> Basket { get; set; }
        public DbSet<Comment> Comment { get; set; }
        public DbSet<Game> Game { get; set; }
        public DbSet<Genre> Genre { get; set; }
        public DbSet<Mark> Mark { get; set; }
        public DbSet<PurchasedGame> PurchasedGame { get; set; }
        public DbSet<PurchaseHistory> PurchaseHistory { get; set; }
        public DbSet<Rating> Rating { get; set; }
        public DbSet<User> User { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
