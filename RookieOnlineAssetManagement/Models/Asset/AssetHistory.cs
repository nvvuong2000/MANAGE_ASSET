using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Models.Asset
{
    public class AssetHistory
    {
        public DateTime DateAssigned { get; set; }
        public string AssignedTo { get; set; }
        public string AssignedBy { get; set; }
        public DateTime ReturnedDate { get; set; }
    }
}