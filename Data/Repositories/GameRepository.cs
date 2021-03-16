using Data.Context;
using Data.Entities;
using Data.Interfaces;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Data.Repositories
{
    public class GameRepository : IBaseRepository<Game>
    {
        private BaseContext context;

        public GameRepository(BaseContext context)
        {
            this.context = context;
        }

        public void DeleteItem(int studentID)
        {
            Game game = context.Game.Find(studentID);
            context.Game.Remove(game);
        }

        public Game GetItemByID(int id)
        {
            return context.Game.Find(id);
        }

        public IEnumerable<Game> GetItems()
        {
            return context.Game.ToList();
        }

        public void InsertItem(Game game)
        {
            context.Game.Add(game);
        }

        public void UpdateItem(Game student)
        {
            context.Entry(student).State = EntityState.Modified;
        }
    }
}
