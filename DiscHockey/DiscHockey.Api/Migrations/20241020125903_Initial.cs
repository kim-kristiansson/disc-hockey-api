using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DiscHockey.Api.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Playlists",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Playlists", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    SpotifyId = table.Column<string>(type: "TEXT", nullable: false),
                    RefreshToken = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GameMusicSets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    GamePlaylistId = table.Column<Guid>(type: "TEXT", nullable: false),
                    WarmupPlaylistId = table.Column<Guid>(type: "TEXT", nullable: false),
                    PenaltyPlaylistId = table.Column<Guid>(type: "TEXT", nullable: false),
                    HomeTeamGoalTrackId = table.Column<Guid>(type: "TEXT", nullable: false),
                    AwayTeamGoalTrackId = table.Column<Guid>(type: "TEXT", nullable: false),
                    UserId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameMusicSets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GameMusicSets_Playlists_GamePlaylistId",
                        column: x => x.GamePlaylistId,
                        principalTable: "Playlists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GameMusicSets_Playlists_PenaltyPlaylistId",
                        column: x => x.PenaltyPlaylistId,
                        principalTable: "Playlists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GameMusicSets_Playlists_WarmupPlaylistId",
                        column: x => x.WarmupPlaylistId,
                        principalTable: "Playlists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GameMusicSets_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tracks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    SpotifyId = table.Column<string>(type: "TEXT", nullable: false),
                    PlaylistId = table.Column<Guid>(type: "TEXT", nullable: false),
                    GameMusicSetId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tracks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tracks_GameMusicSets_GameMusicSetId",
                        column: x => x.GameMusicSetId,
                        principalTable: "GameMusicSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tracks_Playlists_PlaylistId",
                        column: x => x.PlaylistId,
                        principalTable: "Playlists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TrackSegments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    TrackId = table.Column<Guid>(type: "TEXT", nullable: false),
                    StartPoint = table.Column<int>(type: "INTEGER", nullable: false),
                    EndPoint = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrackSegments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrackSegments_Tracks_TrackId",
                        column: x => x.TrackId,
                        principalTable: "Tracks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GameMusicSets_AwayTeamGoalTrackId",
                table: "GameMusicSets",
                column: "AwayTeamGoalTrackId");

            migrationBuilder.CreateIndex(
                name: "IX_GameMusicSets_GamePlaylistId",
                table: "GameMusicSets",
                column: "GamePlaylistId");

            migrationBuilder.CreateIndex(
                name: "IX_GameMusicSets_HomeTeamGoalTrackId",
                table: "GameMusicSets",
                column: "HomeTeamGoalTrackId");

            migrationBuilder.CreateIndex(
                name: "IX_GameMusicSets_PenaltyPlaylistId",
                table: "GameMusicSets",
                column: "PenaltyPlaylistId");

            migrationBuilder.CreateIndex(
                name: "IX_GameMusicSets_UserId",
                table: "GameMusicSets",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_GameMusicSets_WarmupPlaylistId",
                table: "GameMusicSets",
                column: "WarmupPlaylistId");

            migrationBuilder.CreateIndex(
                name: "IX_Tracks_GameMusicSetId",
                table: "Tracks",
                column: "GameMusicSetId");

            migrationBuilder.CreateIndex(
                name: "IX_Tracks_PlaylistId",
                table: "Tracks",
                column: "PlaylistId");

            migrationBuilder.CreateIndex(
                name: "IX_TrackSegments_TrackId",
                table: "TrackSegments",
                column: "TrackId");

            migrationBuilder.AddForeignKey(
                name: "FK_GameMusicSets_Tracks_AwayTeamGoalTrackId",
                table: "GameMusicSets",
                column: "AwayTeamGoalTrackId",
                principalTable: "Tracks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GameMusicSets_Tracks_HomeTeamGoalTrackId",
                table: "GameMusicSets",
                column: "HomeTeamGoalTrackId",
                principalTable: "Tracks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GameMusicSets_Playlists_GamePlaylistId",
                table: "GameMusicSets");

            migrationBuilder.DropForeignKey(
                name: "FK_GameMusicSets_Playlists_PenaltyPlaylistId",
                table: "GameMusicSets");

            migrationBuilder.DropForeignKey(
                name: "FK_GameMusicSets_Playlists_WarmupPlaylistId",
                table: "GameMusicSets");

            migrationBuilder.DropForeignKey(
                name: "FK_Tracks_Playlists_PlaylistId",
                table: "Tracks");

            migrationBuilder.DropForeignKey(
                name: "FK_GameMusicSets_Tracks_AwayTeamGoalTrackId",
                table: "GameMusicSets");

            migrationBuilder.DropForeignKey(
                name: "FK_GameMusicSets_Tracks_HomeTeamGoalTrackId",
                table: "GameMusicSets");

            migrationBuilder.DropTable(
                name: "TrackSegments");

            migrationBuilder.DropTable(
                name: "Playlists");

            migrationBuilder.DropTable(
                name: "Tracks");

            migrationBuilder.DropTable(
                name: "GameMusicSets");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
