using DiscHockey.Api.Data;
using DiscHockey.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DiscHockey.Api.Repositories
{
    public class BaseRepository<TEntity>(AppDbContext context) :IBaseRepository<TEntity> where TEntity : class
    {
        protected readonly AppDbContext _context = context;

        public async Task<TEntity?> AddAsync(TEntity entity)
        {
            if (entity != null)
            {
                await _context.Set<TEntity>().AddAsync(entity);

                return entity;
            }

            throw new ArgumentNullException(nameof(entity));
        }

        public void Delete(TEntity entity)
        {
            if (entity != null)
            {
                _context.Set<TEntity>().Remove(entity);
            }

            throw new ArgumentNullException(nameof(entity));
        }

        public async Task<TEntity?> FindByIdAsync(Guid id)
        {
            return await _context.Set<TEntity>().FindAsync(id);
        }

        public async Task<IEnumerable<TEntity?>> GetAllAsync()
        {
            return await _context.Set<TEntity>().ToListAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(TEntity entity)
        {
            if (entity != null)
            {
                _context.Set<TEntity>().Update(entity);
            }

            throw new ArgumentNullException(nameof(entity));
        }
    }
}
