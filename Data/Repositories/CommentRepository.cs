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
    public class CommentRepository : IBaseRepository<Comment>
    {
        private BaseContext context;

        public CommentRepository(BaseContext context)
        {
            this.context = context;
        }

        public void DeleteItem(int studentID)
        {
            Comment comment = context.Comment.Find(studentID);
            context.Comment.Remove(comment);
        }

        public async Task<Comment> GetItemByID(int id)
        {
            return await context.Comment.FindAsync(id);
        }

        public async Task<IEnumerable<Comment>> GetItems()
        {
            return await context.Comment.ToListAsync();
        }

        public async Task<Comment> InsertItem(Comment comment)
        {
            return (await context.Comment.AddAsync(comment)).Entity;
        }

        public void UpdateItem(Comment student)
        {
            context.Entry(student).State = EntityState.Modified;
        }
    }
}
