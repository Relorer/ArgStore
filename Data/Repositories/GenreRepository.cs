using System;
using System.Collections.Generic;
using System.Text;
using Data.Entities;
using Data.Interfaces;
using Data.Context;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

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

        public async Task<Genre> GetItemByID(int id)
        {
            return await context.Genre.FindAsync(id);
        }

        public async Task<IEnumerable<Genre>> GetItems()
        {
            return await context.Genre.ToListAsync();
        }

        public async Task<Genre> InsertItem(Genre genre)
        {
            return (await context.Genre.AddAsync(genre)).Entity;
        }

        public void UpdateItem(Genre student)
        {
            context.Entry(student).State = EntityState.Modified;
        }
    }
}
