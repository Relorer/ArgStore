using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Context;
using Data.Entities;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories
{
    public class UserRepository : IBaseRepository<User>
    {
        private BaseContext context;

        public UserRepository(BaseContext context)
        {
            this.context = context;
        }

        public void DeleteItem(string id)
        {
            User user = context.User.Find(id);
            context.User.Remove(user);
        }

        public async Task<User> GetItemByID(string id)
        {
            return await context.User.FindAsync(id);
        }

        public async Task<IEnumerable<User>> GetItems()
        {
            return await context.User.ToListAsync();
        }

        public async Task<User> InsertItem(User user)
        {
            return (await context.User.AddAsync(user)).Entity;
        }

        public void UpdateItem(User item)
        {
            context.Entry(item).State = EntityState.Modified;
        }
    }
}
