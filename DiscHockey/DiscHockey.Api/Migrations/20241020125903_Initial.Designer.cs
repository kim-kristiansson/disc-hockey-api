﻿// <auto-generated />
using System;
using DiscHockey.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DiscHockey.Api.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20241020125903_Initial")]
    partial class Initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.10");

            modelBuilder.Entity("DiscHockey.Api.Models.GameMusicSet", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("AwayTeamGoalTrackId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("GamePlaylistId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("HomeTeamGoalTrackId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("PenaltyPlaylistId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("WarmupPlaylistId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("AwayTeamGoalTrackId");

                    b.HasIndex("GamePlaylistId");

                    b.HasIndex("HomeTeamGoalTrackId");

                    b.HasIndex("PenaltyPlaylistId");

                    b.HasIndex("UserId");

                    b.HasIndex("WarmupPlaylistId");

                    b.ToTable("GameMusicSets");
                });

            modelBuilder.Entity("DiscHockey.Api.Models.Playlist", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Playlists");
                });

            modelBuilder.Entity("DiscHockey.Api.Models.Track", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("GameMusicSetId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("PlaylistId")
                        .HasColumnType("TEXT");

                    b.Property<string>("SpotifyId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("GameMusicSetId");

                    b.HasIndex("PlaylistId");

                    b.ToTable("Tracks");
                });

            modelBuilder.Entity("DiscHockey.Api.Models.TrackSegment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<int>("EndPoint")
                        .HasColumnType("INTEGER");

                    b.Property<int>("StartPoint")
                        .HasColumnType("INTEGER");

                    b.Property<Guid>("TrackId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("TrackId");

                    b.ToTable("TrackSegments");
                });

            modelBuilder.Entity("DiscHockey.Api.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("RefreshToken")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("SpotifyId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("DiscHockey.Api.Models.GameMusicSet", b =>
                {
                    b.HasOne("DiscHockey.Api.Models.Track", "AwayTeamGoalTrack")
                        .WithMany()
                        .HasForeignKey("AwayTeamGoalTrackId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DiscHockey.Api.Models.Playlist", "GamePlaylist")
                        .WithMany()
                        .HasForeignKey("GamePlaylistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DiscHockey.Api.Models.Track", "HomeTeamGoalTrack")
                        .WithMany()
                        .HasForeignKey("HomeTeamGoalTrackId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DiscHockey.Api.Models.Playlist", "PenaltyPlaylist")
                        .WithMany()
                        .HasForeignKey("PenaltyPlaylistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DiscHockey.Api.Models.User", "User")
                        .WithMany("GameMusicSets")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DiscHockey.Api.Models.Playlist", "WarmupPlaylist")
                        .WithMany()
                        .HasForeignKey("WarmupPlaylistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AwayTeamGoalTrack");

                    b.Navigation("GamePlaylist");

                    b.Navigation("HomeTeamGoalTrack");

                    b.Navigation("PenaltyPlaylist");

                    b.Navigation("User");

                    b.Navigation("WarmupPlaylist");
                });

            modelBuilder.Entity("DiscHockey.Api.Models.Track", b =>
                {
                    b.HasOne("DiscHockey.Api.Models.GameMusicSet", "GameMusicSet")
                        .WithMany()
                        .HasForeignKey("GameMusicSetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DiscHockey.Api.Models.Playlist", "Playlist")
                        .WithMany("Tracks")
                        .HasForeignKey("PlaylistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("GameMusicSet");

                    b.Navigation("Playlist");
                });

            modelBuilder.Entity("DiscHockey.Api.Models.TrackSegment", b =>
                {
                    b.HasOne("DiscHockey.Api.Models.Track", "Track")
                        .WithMany("TrackSegments")
                        .HasForeignKey("TrackId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Track");
                });

            modelBuilder.Entity("DiscHockey.Api.Models.Playlist", b =>
                {
                    b.Navigation("Tracks");
                });

            modelBuilder.Entity("DiscHockey.Api.Models.Track", b =>
                {
                    b.Navigation("TrackSegments");
                });

            modelBuilder.Entity("DiscHockey.Api.Models.User", b =>
                {
                    b.Navigation("GameMusicSets");
                });
#pragma warning restore 612, 618
        }
    }
}