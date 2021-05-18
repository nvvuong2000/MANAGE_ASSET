using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Models.Asset
{
    public class AssetCreateRequest
    {
        public string Id { get; set; }
        public string AssetName { get; set; }
        public string Specification { get; set; }
        public DateTime InstalledDate { get; set; }
        public int StateAsset { get; set; }
        public int CategoryId { get; set; }
    }
}
