using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace RookieOnlineAssetManagement.Entities
{
    public class User : IdentityUser<int>
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public override int Id
        {
            get { return base.Id; }
            set { base.Id = value; }
        }
        public string StaffCode { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime JoinedDate { get; set; }
        public bool Gender { get; set; }
        public bool Type { get; set; }
        public bool Disable { get; set; }
        public string Location{get;set;}
        public virtual ICollection<Assignment> LenderAssets { get; set; }
        public virtual ICollection<Assignment> BorrowerAssets { get; set; }
        public virtual ICollection<Returning> UserAcceptAssets { get; set; }
    }
}
