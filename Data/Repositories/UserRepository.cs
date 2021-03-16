using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using Data.Context;
using Data.Entities;
using Data.Interfaces;

namespace Data.Repositories
{
    public class UserRepository : IBaseRepository<User>
    {
        private BaseContext context;

        public UserRepository(BaseContext context)
        {
            this.context = context;
        }

        public void DeleteItem(int studentID)
        {
            User user = context.User.Find(studentID);
            context.User.Remove(user);
        }

        public User GetItemByID(int id)
        {
            return context.User.Find(id);
        }

        public IEnumerable<User> GetItems()
        {
            return context.User.ToList();
        }

        public void InsertItem(User user)
        {
            context.User.Add(user);
        }

        public void UpdateItem(User student)
        {
            context.Entry(student).State = EntityState.Modified;
        }
    }
}
