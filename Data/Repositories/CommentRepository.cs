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

        public Comment GetItemByID(int id)
        {
            return context.Comment.Find(id);
        }

        public IEnumerable<Comment> GetItems()
        {
            return context.Comment.ToList();
        }

        public void InsertItem(Comment comment)
        {
            context.Comment.Add(comment);
        }

        public void UpdateItem(Comment student)
        {
            context.Entry(student).State = EntityState.Modified;
        }
    }
}
