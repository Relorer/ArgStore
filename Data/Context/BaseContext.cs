using Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace Data.Context
{
    public class BaseContext : DbContext
    {
        public BaseContext() : base()
        {
            this.Initialize();
        }

        public BaseContext(DbContextOptions options) : base(options)
        {
            this.Initialize();
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
            .HasOne(a => a.Basket)
            .WithOne(b => b.User)
            .HasForeignKey<User>(p => p.Id);
        }
    }
}
