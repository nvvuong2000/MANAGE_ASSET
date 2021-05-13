using RookieOnlineAssetManagement.Models.Asset;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Models
{
    public class AssetDetails : AssetsListViewModel
    {
        public DateTime InstalledDate { get; set; }
        public string Specification { get; set; }

        public List<AssetHistory> assetHistories { get; set; }



    }
}