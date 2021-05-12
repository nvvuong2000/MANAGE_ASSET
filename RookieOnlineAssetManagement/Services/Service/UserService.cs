using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RookieOnlineAssetManagement.Data;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models.User;
using RookieOnlineAssetManagement.Services.Interface;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Services.Service
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IHttpContextAccessor _httpAccessor;
        private readonly UserManager<User> _userManager;


        public UserService(ApplicationDbContext dbContext, IHttpContextAccessor httpAccessor, UserManager<User> userManager)
        {
            _dbContext = dbContext;
            _httpAccessor = httpAccessor;
            _userManager = userManager;
        }

        public async Task<IEnumerable<UserModel>> GetUsers()
        {
            var userInfo = await GetInfoUserLogin();
            var location = userInfo.Location;

            return await _dbContext.Users
                .Select(x => new UserModel
                {
                    Id = x.Id,
                    StaffCode = x.StaffCode,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    UserName = x.UserName,
                    DateOfBirth = x.DateOfBirth,
                    Gender = x.Gender,
                    JoinedDate = x.JoinedDate,
                    Type = x.Type,
                    Disable = x.Disable,
                    Location = x.Location
                }).Where(x => x.Disable == false && x.Location.Equals(location))
                .ToListAsync();
        }
        public async Task<UserModel> GetUsersById(int id)
        {
            return await _dbContext.Users
                .Select(x => new UserModel
                {
                    Id = x.Id,
                    StaffCode = x.StaffCode,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    UserName = x.UserName,
                    DateOfBirth = x.DateOfBirth,
                    Gender = x.Gender,
                    JoinedDate = x.JoinedDate,
                    Type = x.Type,
                    Disable = x.Disable,
                    Location = x.Location
                }).FirstOrDefaultAsync(x => x.Disable == false && x.Id == id);
        }

        public async Task CreateUser(CreateUserModel createUserModel)
        {
            string[] userNameSplit = createUserModel.LastName.Split(' ');
            string userName = "";
            var userNameSub = "";
            foreach (var name in userNameSplit)
            {
                string lower = name.ToLower();
                userName += lower.Substring(0, 1);
            }
            var find = _dbContext.Users.Where(x => x.FirstName.Equals(createUserModel.FirstName)
            && x.LastName.Equals(createUserModel.LastName)).ToList();
            var count = find.Count();
            if (count != 0)
            {
                userNameSub = createUserModel.FirstName.ToLower() + userName + count;
            }
            else
            {
                userNameSub = createUserModel.FirstName.ToLower() + userName;
            }

            var user = new User
            {
                FirstName = createUserModel.FirstName,
                LastName = createUserModel.LastName,
                UserName = userNameSub,
                DateOfBirth = createUserModel.DateOfBirth,
                JoinedDate = createUserModel.JoinedDate,
                Gender = createUserModel.Gender,
                Type = createUserModel.Type,
                Email = userNameSub,
                Disable = false,
                Location = createUserModel.Location
            };
            var splitSpace = user.DateOfBirth.ToString().Split(" ");
            var split = splitSpace[0].Split("/");
            split[0] = split[0].PadLeft(2, '0');
            split[1] = split[1].PadLeft(2, '0');
            var generatePassword = user.UserName + "@" + split[1] + split[0] + split[2];
            var result = await _userManager.CreateAsync(user, generatePassword);
            if (result.Succeeded)
            {
                char x = '0';
                string id = user.Id.ToString().PadLeft(4, x);
                user.StaffCode = "SD" + id;

                await _dbContext.SaveChangesAsync();
            }

        }

        public async Task UpdateUser(int id, CreateUserModel createUserModel)
        {
            var selectUser = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            selectUser.DateOfBirth = createUserModel.DateOfBirth;
            selectUser.Gender = createUserModel.Gender;
            selectUser.JoinedDate = createUserModel.JoinedDate;
            selectUser.Type = createUserModel.Type;
            await _dbContext.SaveChangesAsync();
        }

        public async Task DisableUser(int id)
        {
            var selectUser = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            selectUser.Disable = true;
            await _dbContext.SaveChangesAsync();
        }

        public string GetIdUserLogin()
        {

            return _httpAccessor.HttpContext.User?.Claims?.FirstOrDefault(t => t.Type == ClaimTypes.NameIdentifier)?.Value;
        }
        public async Task<UserModel> GetInfoUserLogin()
        {

            string id = GetIdUserLogin();

            var info = await (from u in _dbContext.Users

                              where u.Id.Equals(int.Parse(id))

                              select new UserModel
                              {
                                  Id = u.Id,

                                  UserName = u.UserName,

                                  Location = u.Location,

                                  Type = u.Type,

                              }).FirstOrDefaultAsync();

            return info;
        }
    }
}
