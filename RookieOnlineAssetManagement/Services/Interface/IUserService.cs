using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RookieOnlineAssetManagement.Data;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models.User;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Services.Interface
{
    public interface IUserService
    {
        Task<IEnumerable<UserModel>> GetUsers();
        Task<UserModel> GetUsersById(int id);
        Task CreateUser(CreateUserModel createUserModel);
        Task UpdateUser(int id, CreateUserModel createUserModel);
        Task DisableUser(int id);
        string GetIdUserLogin();
        Task<UserModel> GetInfoUserLogin();
        Task<IEnumerable<UserModel>> SearchFilterUser(SearchUserModel userSearch);
        Task<IEnumerable<UserModel>> SortUser(SortUserModel sortUser);
    }
}
