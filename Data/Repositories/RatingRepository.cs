using System;
using System.Collections.Generic;
using System.Text;
using Data.Entities;
using Data.Context;
using Data.Interfaces;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class RatingRepository : IBaseRepository<Rating>
    {
        private BaseContext context;

        public RatingRepository(BaseContext context)
        {
            this.context = context;
        }

        public void DeleteItem(string studentID)
        {
            Rating rating = context.Rating.Find(studentID);
            rating.IsDeleted = true;
            UpdateItem(rating);
        }

        public async Task<Rating> GetItemByID(string id)
        {
            return await context.Rating.FindAsync(id);
        }

        public async Task<IEnumerable<Rating>> GetItems()
        {
            return await context.Rating.Where(a => !a.IsDeleted).ToListAsync();
        }

        public async Task<Rating> InsertItem(Rating rating)
        {
            return (await context.Rating.AddAsync(rating)).Entity;
        }

        public void UpdateItem(Rating student)
        {
            context.Entry(student).State = EntityState.Modified;
        }
    }
}
