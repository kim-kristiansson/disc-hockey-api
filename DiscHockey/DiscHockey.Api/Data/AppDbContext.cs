using DiscHockey.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace DiscHockey.Api.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) :DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Track> Tracks { get; set; }
        public DbSet<TrackSegment> TrackSegments { get; set; }
        public DbSet<Playlist> Playlists { get; set; }
        public DbSet<GameMusicSet> GameMusicSets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(u => u.GameMusicSets)
                .WithOne(g => g.User)
                .HasForeignKey(g => g.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<GameMusicSet>()
                .HasOne(g => g.GamePlaylist)
                .WithMany()
                .HasForeignKey(g => g.GamePlaylistId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<GameMusicSet>()
                .HasOne(g => g.WarmupPlaylist)
                .WithMany()
                .HasForeignKey(g => g.WarmupPlaylistId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<GameMusicSet>()
                .HasOne(g => g.PenaltyPlaylist)
                .WithMany()
                .HasForeignKey(g => g.PenaltyPlaylistId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<GameMusicSet>()
                .HasOne(g => g.HomeTeamGoalTrack)
                .WithMany()
                .HasForeignKey(g => g.HomeTeamGoalTrackId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<GameMusicSet>()
                .HasOne(g => g.AwayTeamGoalTrack)
                .WithMany()
                .HasForeignKey(g => g.AwayTeamGoalTrackId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Playlist>()
                .HasMany(p => p.Tracks)
                .WithOne(t => t.Playlist)
                .HasForeignKey(t => t.PlaylistId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Track>()
                .HasMany(t => t.TrackSegments)
                .WithOne(ts => ts.Track)
                .HasForeignKey(ts => ts.TrackId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
