using Microsoft.EntityFrameworkCore;
namespace SoundApi.Models
{
    public class SoundContext : DbContext
    {
        public SoundContext(DbContextOptions<SoundContext> options) : base(options)
        { 
        }
        public DbSet<SoundItem> Sounds { get; set;  }
    }
}
