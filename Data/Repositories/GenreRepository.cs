using System;
using System.Collections.Generic;
using System.Text;
using Data.Entities;
using Data.Interfaces;
using Data.Context;
using System.Linq;
using System.Data.Entity;

namespace Data.Repositories
{
    public class GenreRepository : IBaseRepository<Genre>
    {
        private BaseContext context;

        public GenreRepository(BaseContext context)
        {
            this.context = context;
        }

        public void DeleteItem(int studentID)
        {
            Genre genre = context.Genre.Find(studentID);
            context.Genre.Remove(genre);
        }

        public Genre GetItemByID(int id)
        {
            return context.Genre.Find(id);
        }

        public IEnumerable<Genre> GetItems()
        {
            return context.Genre.ToList();
        }

        public void InsertItem(Genre genre)
        {
            context.Genre.Add(genre);
        }

        public void UpdateItem(Genre student)
        {
            context.Entry(student).State = EntityState.Modified;
        }
    }
}
