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
using RookieOnlineAssetManagement.Services.Interface;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace RookieOnlineAssetManagement.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILogger _logger;

        public UsersController(IUserService userService, ILogger<UsersController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetUsers()
        {
            var result = await _userService.GetUsers();
            return Ok(result);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetUsersById(int id)
        {
            if(id==null)
            {
                return NotFound();
            }
            return await _userService.GetUsersById(id);
        }

        [HttpPost]
        public async Task<ActionResult> CreateUser(CreateUserModel createUserModel)
        {
            await _userService.CreateUser(createUserModel);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUser(int id, CreateUserModel createUserModel)
        {
            if(id==null)
            {
                return NotFound();
            }
            await _userService.UpdateUser(id, createUserModel);
            return Ok();
        }

        [HttpPut]
        [Route("disable/{id}")]
        public async Task<ActionResult> DisableUser(int id)
        {
             if(id==null)
            {
                return NotFound();
            }
            await _userService.DisableUser(id);
            return Ok();
        }
        [HttpGet]
        [Route("iduserlogin")]
        public string GetIdUserLogin()
        {

            return _userService.GetIdUserLogin();
        }
        [HttpGet]
        [Route("infouserlogin")]
        public async Task<ActionResult> GetInfoUserLogin()
        {

          return Ok(await _userService.GetInfoUserLogin());
        }


    }
}
