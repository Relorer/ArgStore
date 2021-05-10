using Data.Context;
using Data.Repositories;
using System;

namespace BLL
{
    /// <summary>
    /// Класс, предоставляющий интерфес для взаимодействия с репозиториями
    /// </summary>
    public class UnitOfWork : IUnitOfWork
    {
        private BaseContext context;

        public UnitOfWork(BaseContext context)
        {
            this.context = context;
        }

        private UserRepository userRepository;
        public UserRepository User
        {
            get
            {
                if (userRepository == null)
                {
                    userRepository = new UserRepository(context);
                }
                return userRepository;
            }
        }
        
        private PurchaseHistoryRepository purchaseHistoryRepository;
        public PurchaseHistoryRepository PurchaseHistory
        {
            get
            {
                if (purchaseHistoryRepository == null)
                {
                    purchaseHistoryRepository = new PurchaseHistoryRepository(context);
                }
                return purchaseHistoryRepository;
            }
        }
        private PurchasedGameRepository purchasedGameRepository;
        public PurchasedGameRepository PurchasedGame
        {
            get
            {
                if (purchasedGameRepository == null)
                {
                    purchasedGameRepository = new PurchasedGameRepository(context);
                }
                return purchasedGameRepository;
            }
        }
        private MarkRepository markRepository;
        public MarkRepository Mark
        {
            get
            {
                if (markRepository == null)
                {
                    markRepository = new MarkRepository(context);
                }
                return markRepository;
            }
        }
        private GenreRepository genreRepository;
        public GenreRepository Genre
        {
            get
            {
                if (genreRepository == null)
                {
                    genreRepository = new GenreRepository(context);
                }
                return genreRepository;
            }
        }
        private GameRepository gameRepository;
        public GameRepository Game
        {
            get
            {
                if (gameRepository == null)
                {
                    gameRepository = new GameRepository(context);
                }
                return gameRepository;
            }
        }
        private CommentRepository commentRepository;
        public CommentRepository Comment
        {
            get
            {
                if (commentRepository == null)
                {
                    commentRepository = new CommentRepository(context);
                }
                return commentRepository;
            }
        }
        private BasketRepository basketRepository;
        public BasketRepository Basket
        {
            get
            {
                if (basketRepository == null)
                {
                    basketRepository = new BasketRepository(context);
                }
                return basketRepository;
            }
        }


        public void Save()
        {
            context.SaveChanges();
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
                this.disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
