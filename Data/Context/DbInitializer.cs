using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Data.Context
{
    static class DbInitializer
    {
        public static void Initialize(this BaseContext context)
        {
            context.Database.EnsureCreated();
            if (context.Game.Any())
            {
                return;
            }
            var games = new Game[]
            {
                new Game
            {
                     Name = "1",
                    Description = "2",
                    ReleaseDate = DateTime.Now,
                    Price = 123,
                    PriceIncludingDiscount = 123,
                    CoverPath = "1",
            }
            };
            foreach (var c in games)
            {
                context.Game.Add(c);
            }
            context.SaveChanges();

        }
    }
}
