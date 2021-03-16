using System;
using System.Collections.Generic;
using System.Text;
using Data.Entities;
using Data.Context;
using Data.Interfaces;
using System.Linq;
using System.Data.Entity;

namespace Data.Repositories
{
    public class RatingRepository : IBaseRepository<Rating>
    {
        private BaseContext context;

        public RatingRepository(BaseContext context)
        {
            this.context = context;
        }

        public void DeleteItem(int studentID)
        {
            Rating rating = context.Rating.Find(studentID);
            context.Rating.Remove(rating);
        }

        public Rating GetItemByID(int id)
        {
            return context.Rating.Find(id);
        }

        public IEnumerable<Rating> GetItems()
        {
            return context.Rating.ToList();
        }

        public void InsertItem(Rating rating)
        {
            context.Rating.Add(rating);
        }

        public void UpdateItem(Rating student)
        {
            context.Entry(student).State = EntityState.Modified;
        }
    }
}
