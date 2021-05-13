using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models;

namespace RookieOnlineAssetManagement.Data
{
    public class ApplicationDbContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Returning> Returnings { get; set; }
         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Assignment>()
                .HasOne(p => p.Borrower)
                .WithMany(c => c.BorrowerAssets)
                .HasForeignKey(m => m.BorrowerId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            modelBuilder.Entity<Assignment>()
               .HasOne(p => p.Lender)
               .WithMany(c => c.LenderAssets)
               .HasForeignKey(m => m.LenderId)
               .OnDelete(DeleteBehavior.Restrict)
               .IsRequired();
            modelBuilder.Entity<Returning>()
               .HasOne(p => p.UserAccept)
               .WithMany(c => c.UserAcceptAssets)
               .HasForeignKey(m => m.UserAccepteId)
               .OnDelete(DeleteBehavior.Restrict)
               .IsRequired();
            var hasher = new PasswordHasher<User>();
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, StaffCode = "SD0001", Gender = true, Type = true, DateOfBirth = new DateTime(1999, 2, 13), 
                JoinedDate = new DateTime(2021, 3, 15), UserName = "dattt", PasswordHash = hasher.HashPassword(null, "dattt@123"),
                FirstName = "Đạt", LastName = "Trần Thành",Location="HCM",NormalizedUserName="DATTT",Email="dattt",
                NormalizedEmail="DATT",SecurityStamp = string.Empty, EmailConfirmed = true,FullName="Đạt Trần Thành"});
            modelBuilder.Entity<User>().HasData(
                new User { Id = 2, StaffCode = "SD0002", Gender = true, Type = true, DateOfBirth = new DateTime(1999, 2, 13), 
                JoinedDate = new DateTime(2021, 3, 15), UserName = "vuongnv", PasswordHash = hasher.HashPassword(null, "vuongnv@123"), 
                FirstName = "Vương", LastName = "Nguyễn Văn",Location="HN",NormalizedUserName="VUONGNV",Email="vuongnv",
                NormalizedEmail="VUONGNV",SecurityStamp = string.Empty, EmailConfirmed = true,FullName="Vương Nguyễn Văn"});
        }
    }
}
