using Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Context
{
    class BaseInitializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<BaseContext>
    {
        protected override void Seed(BaseContext context)
        {

            var games = new List<Game>()
            {
                new Game()
                {
                     Name = "Assasin",
                     Description= "Text description",
                     ReleaseDate = DateTime.Now,
                     PriceIncludingDiscount= 150,
                     Price= 150,
                     CoverPath = "https://store-images.s-microsoft.com/image/apps.38252.13799379090284100.fe523bb7-8f74-4d91-a966-4ee89089de83.fa7fa51c-f391-4d40-b281-c6de5a02076e?mode=scale&q=90&h=300&w=200&background=%23FFFFFF",
                     Rating= new Rating(),
                },
            };

            games.ForEach(e => context.Game.Add(e));

            context.SaveChanges();
        }
    }
}
