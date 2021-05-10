using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Data.Context
{
    static class DbInitializer
    {
        /// <summary>
        /// Метод расширения для первоначальной инициализации базы
        /// </summary>
        /// <param name="context">Контекст базы данных</param>
        public static void Initialize(this BaseContext context)
        {
            if (!context.Database.EnsureCreated())
            {
                return;
            }
            var games = new Game[]
            {
                new Game
            {
                    Name = "Assassin's Creed® Valhalla",
                    Description = "In Assassin's Creed® Valhalla, become Eivor, a legendary Viking raider on a quest for glory. Explore England's Dark Ages as you raid your enemies, dual-wield powerful weapons, personalize and grow your clan’s settlement, and build your political power.",
                    ReleaseDate = DateTime.Now,
                    Price = 60,
                    Discount = 60,
                    Cover = "https://store-images.s-microsoft.com/image/apps.1547.14585440003614248.9f7109bf-73f7-4bc7-ba61-1eeb006d905a.75930d81-6e85-436d-9b61-1279b8dd9b31",
            },
                new Game
            {
                    Name = "Minecraft ",
                    Description = "Minecraft is a game about placing blocks and going on adventures. Build anything you can imagine with unlimited resources in Creative mode, or go on grand expeditions in Survival, journeying across mysterious lands and into the depths of your own infinite worlds. Will you hide from monsters or craft tools, armor and weapons to fight back? No need to go alone! Share the adventure with friends in split-screen multiplayer and online.",
                    ReleaseDate = DateTime.Now,
                    Price = 20,
                    Discount = 20,
                    Cover = "https://store-images.s-microsoft.com/image/apps.17382.13510798887677013.afcc99fc-bdcc-4b9c-8261-4b2cd93b8845.49beb011-7271-4f15-a78b-422c511871e4",
            },
                new Game
            {
                    Name = "Grand Theft Auto V",
                    Description = "Explore the stunning world of Los Santos and Blaine County in the ultimate Grand Theft Auto V experience, featuring a range of technical upgrades and enhancements for new and returning players. In addition to increased draw distances and higher resolution, players can expect a range of additions and improvements",
                    ReleaseDate = DateTime.Now,
                    Price = 30,
                    Discount = 30,
                    Cover = "https://store-images.s-microsoft.com/image/apps.8135.66515090704019777.7fa547c1-c211-4229-a4d3-3ceef762e0a4.0bb0ac0a-9d63-4d91-8e53-f2e39a040bcd",
            },
                new Game
            {
                    Name = "Little Nightmares II",
                    Description = "Return to a world of charming horror in Little Nightmares II, a suspense adventure game in which you play as Mono, a young boy trapped in a world that has been distorted by the humming transmission of a distant tower. With Six, the girl in the yellow raincoat, as his guide, Mono sets out to discover the dark secrets of The Signal Tower. Their journey won't be easy; Mono and Six will face a host of new threats from the terrible residents of this world. Will you dare to face this collection of new, little nightmares?",
                    ReleaseDate = DateTime.Now,
                    Price = 30,
                    Discount = 30,
                    Cover = "https://store-images.s-microsoft.com/image/apps.1273.64860558234786024.c6d17f3a-2d73-46e6-8a1e-c828e528d51f.c0546c16-c1b2-4f91-921f-762c88c3ab54?mode=scale&q=90&h=300&w=200",
            },
                new Game
            {
                    Name = "FOR HONOR",
                    Description = "This game is optimized for next-gen (4K Resolution for Xbox Series X / 1080p for Xbox Series S). Cross-save is available: your profile, progression, including all purchases and inventory, is automatically shared. Discover For Honor®, a groundbreaking melee action game developed by Ubisoft Montreal in collaboration with other Ubisoft studios. UNIQUE WARRIORS \n Choose your warrior from the Knights, the Vikings, and the Samurai. MEMORABLE STORY CAMPAIGN \n Storm castles and fortresses in massive battles, and confront bosses in intense duels. PLAY ALONE OR WITH FRIENDS Choose from offline single-player campaign or online multiplayer.",
                    ReleaseDate = DateTime.Now,
                    Price = 30,
                    Discount = 30,
                    Cover = "https://store-images.s-microsoft.com/image/apps.17913.66061984908082265.00884c53-4850-4a2a-8e92-43e3b03bb0dc.834b0cfc-cc7a-44ab-a5ef-2fdfe42bbcaa?mode=scale&q=90&h=300&w=200",
            },
                new Game
            {
                    Name = "NBA 2K21",
                    Description = "NBA 2K21 is the latest title in the world-renowned, best-selling NBA 2K series, delivering an industry-leading sports video game experience. With extensive improvements upon its best-in-class graphics and gameplay, competitive and community online features, and deep, varied game modes, NBA 2K21 offers one-of-a-kind immersion into all facets of NBA basketball and culture - where Everything is Game.",
                    ReleaseDate = DateTime.Now,
                    Price = 60,
                    Discount = 60,
                    Cover = "https://store-images.s-microsoft.com/image/apps.21520.14522552561148096.987376a7-b8c2-4bec-8d4f-48e4b6df5630.1a1aefd0-15dd-44a2-8303-be7a96288f1e",
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
