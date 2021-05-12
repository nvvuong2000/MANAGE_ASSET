using RookieOnlineAssetManagement.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Models
{
    public class AssetDetailsNotIncludeHistory
    {
        public string AssetCode { get; set; }
        public string AssetName { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string Specification { get; set; }
        public DateTime InstalledDate { get; set; }
        public StateAsset StateAsset { get; set; }
    }
}
