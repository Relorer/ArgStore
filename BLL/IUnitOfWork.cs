using Data.Repositories;
using System;

namespace BLL
{
    public interface IUnitOfWork : IDisposable
    {
        public UserRepository User { get; }
        public RatingRepository Rating { get; }
        public PurchaseHistoryRepository PurchaseHistory { get; }
        public PurchasedGameRepository PurchasedGame { get; }
        public MarkRepository Mark { get; }
        public GenreRepository Genre { get; }
        public GameRepository Game { get; }
        public CommentRepository Comment { get; }
        public BasketRepository Basket { get; }
        public void Save();
    }
}
